import Fastify from "fastify";
import path from "path";
import multipart from "@fastify/multipart";
import fs, { createReadStream } from "fs";
import { nanoid } from "nanoid";
import { EventData, Month } from "@utils/datatype";

const fastify = Fastify({
  logger: true,
});

fastify.register(multipart);

// PING route
fastify.get("/ping", async () => {
  console.log("Ping route hit...");
  return { hello: "world" };
});

const uploadDir = path.join(process.cwd(), "uploads");

// Define the path to the competitions data JSON file (outside of src)
// const jsonFilePath = path.join(
//   process.cwd(),
//   "src",
//   "data",
//   "competitionsData.json"
// );

// Define the public assets folder where images will be uploaded

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//Uploading file
fastify.post("/upload/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  // Ensure the event-specific folder exists
  const eventDir = path.join(uploadDir, id);
  if (!fs.existsSync(eventDir)) {
    fs.mkdirSync(eventDir, { recursive: true });
  }

  const data = await request.file();
  if (!data) {
    return reply.status(400).send({ error: "No file uploaded" });
  }

  // Get the original file name
  const originalFileName = data.filename;

  // Define the file path within the event folder, preserving the original file name
  const filePath = path.join(eventDir, originalFileName);

  // Create a writable stream to save the file
  const writeStream = fs.createWriteStream(filePath);
  data.file.pipe(writeStream);

  return reply.send({
    message: "File uploaded successfully",
    filePath,
  });
});

//Download file
fastify.get("/download/:idEvent/:fileName", async (request, reply) => {
  const { idEvent, fileName } = request.params as {
    idEvent: string;
    fileName: string;
  };

  const filePath = path.join(process.cwd(), "uploads", idEvent, fileName);

  if (!fs.existsSync(filePath)) {
    return reply.status(404).send({ error: "File not found" });
  }

  // Stream the file back to the client for download
  reply.header("Content-Type", "application/pdf");
  reply.header("Content-Disposition", `attachment; filename="${fileName}"`);
  return reply.send(createReadStream(filePath));
});

//Delete the file
fastify.delete("/delete/:idEvent/:fileName", async (request, reply) => {
  const { idEvent, fileName } = request.params as {
    idEvent: string;
    fileName: string;
  };

  const filePath = path.join(uploadDir, "events", idEvent, fileName);

  if (!fs.existsSync(filePath)) {
    return reply.status(404).send({ error: "File not found" });
  }

  fs.unlinkSync(filePath); // Delete the file
  return reply.send({ message: "File deleted successfully" });
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server started at ${address}`);
  fastify.log.info(`Server listening at ${address}`);
});

const publicAssetsDir = path.join(
  process.cwd(),
  "public",
  "assets",
  "UpcomingEventsAssets"
);
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Route to handle image upload and JSON update
fastify.post("/addEvent", async (request, reply) => {
  try {
    console.log("Request received");

    const test: EventData = {
      name: "",
      date: { days: "", month: Month.April, year: 0 },
      address: "",
      about: "",
      city: "",
      pdfUploaded: false,
    };

    const fileData: { file?: NodeJS.ReadableStream; filename?: string } = {};

    const parts = request.parts();

    for await (const part of parts) {
      console.log("PART:", part);

      if (part.type === "field") {
        const { fieldname, value } = part;

        if (fieldname === "name") test.name = value as string;
        else if (fieldname === "date") {
          try {
            const parsedDate = JSON.parse(value as string);
            test.date = {
              days: parsedDate.days as string,
              month: parsedDate.month as Month,
              year: parsedDate.year as number,
            };
          } catch (error) {
            console.error("Invalid date format:", error);
            return reply.status(400).send({ error: "Invalid date format" });
          }
        } else if (fieldname === "address") test.address = value as string;
        else if (fieldname === "about") test.about = value as string;
        else if (fieldname === "city") test.city = value as string;
      } else if (part.type === "file") {
        console.log(`File received: ${part.filename}`);

        // Define file path
        const filePath = path.join("uploads", part.filename);
        const writeStream = fs.createWriteStream(filePath);

        part.file.pipe(writeStream);

        await new Promise<void>((resolve, reject) => {
          writeStream.on("finish", () => {
            console.log("File write complete.");
            resolve();
          });
          writeStream.on("error", reject);
        });

        fileData.file = fs.createReadStream(filePath);
        fileData.filename = part.filename;
      }
    }

    // Ensure a file was uploaded
    if (!fileData.file || !fileData.filename) {
      return reply.status(400).send({ error: "No image uploaded" });
    }

    // Validate file type
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(fileData.filename).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return reply
        .status(400)
        .send({ error: "Only .jpg or .png files are allowed" });
    }

    // Ensure the folder structure exists
    const yearMonthDir = path.join(
      "public/assets/UpcomingEventsAssets",
      test.date.year.toString(),
      test.date.month
    );
    fs.mkdirSync(yearMonthDir, { recursive: true });

    // Define unique file name
    const competitionID = nanoid();
    const newFileName = `${competitionID}-${Date.now()}${fileExtension}`;
    const filePath = path.join(yearMonthDir, newFileName);

    // Write the file to disk
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      fileData.file!.pipe(writeStream);
      writeStream.on("finish", () => resolve());
      writeStream.on("error", reject);
    });

    // Read existing JSON data
    let jsonData: { competitions: EventData[] } = { competitions: [] };
    if (fs.existsSync("src/data/competitionsData.json")) {
      jsonData = JSON.parse(
        fs.readFileSync("src/data/competitionsData.json", "utf-8")
      );
    }

    // Create new event object
    const competitionData = {
      id: competitionID,
      name: test.name,
      city: test.city,
      address: test.address,
      date: {
        days: test.date.days,
        month: test.date.month,
        year: test.date.year,
      },
      imgSrc: `/wwwdance/assets/UpcomingEventsAssets/${test.date.year}/${test.date.month}/${newFileName}`,
      about: test.about,
      pdfUploaded: false,
    };

    // Add new event and write JSON file
    jsonData.competitions.push(competitionData);
    fs.writeFileSync(
      "src/data/competitionsData.json",
      JSON.stringify(jsonData, null, 2)
    );

    return reply.send({
      message: "Event added successfully!",
      competition: competitionData,
    });
  } catch (error) {
    console.error("Error:", error);
    return reply.status(500).send({ error: "Failed to process the request" });
  }
});
