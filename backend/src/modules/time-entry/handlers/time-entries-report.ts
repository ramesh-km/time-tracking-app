import { RequestHandler } from "express";
import timeEntryRepository from "../repository";
import { getTimeEntriesReportSchema } from "../zod-schemas";
import { stringify } from "csv";
import * as fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { TimeEntry, Tag } from "@prisma/client";

const getTimeEntriesReportHandler: RequestHandler = async (req, res, next) => {
  const query = getTimeEntriesReportSchema.parse(req.query);

  let timeEntries: { data: (TimeEntry & { tags: Tag[] })[]; total: number };
  try {
    timeEntries = await timeEntryRepository.getTimeEntriesPaginated({
      ...query,
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
    return;
  }

  res.format({
    "application/json": () => {
      res.json(timeEntries);
    },
    "text/csv": () => {
      // Send the CSV file as a response

      // Create a stream from the time entries
      const csvStream = stringify(timeEntries.data, {
        header: true,
        columns: ["id", "note", "start", "end"],
      });

      // Create a csv file with the above stream
      const fileName = `time-entries-${new Date().toISOString()}.csv`;
      const filePath = path.join(tmpdir(), fileName);
      const fileStream = fs.createWriteStream(filePath);
      csvStream.pipe(fileStream);

      // Send the file as a response
      fileStream.on("finish", () => {
        res.download(filePath);
      });

      // Delete the file after the response is sent
      // res.on("finish", () => {
      //   fs.rmdir(filePath, () => {
      //     // Ignore errors
      //     // TODO:
      //   });
      // });
    },
  });
};

export default getTimeEntriesReportHandler;
