// external
import _ from "lodash";

export const getPayloadForMutation = async ({ dirHandle, formData }) => {
  const sections = await getSections(dirHandle);

  const { title, author } = formData || {};
  const payload = {
    title,
    author,
    sourceTitle: title,
    sections,
  };

  return payload;
};

async function getVideoDuration(file) {
  if (!file || !file.type.startsWith("video/")) return null;

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src); // Clean up the object URL
      resolve(video.duration); // Duration in seconds
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src); // Clean up the object URL
      reject(new Error("Error loading video metadata."));
    };

    video.src = URL.createObjectURL(file);
  });
}

const getSections = async (dirHandle) => {
  const sections = [];
  const dummySection = {
    title: "Untitled",
    sourceTitle: "Untitled",
  };

  const dummyFiles = [];

  for await (const [name, handle] of dirHandle.entries()) {
    if (handle.kind === "file") {
      const file = await handle.getFile(); // Get the file from the handle

      let duration = null;
      if (file.type.startsWith("video/")) {
        // Only get duration if it's a video file
        duration = await getVideoDuration(file);
      }

      const fileData = {
        title: name,
        sourceTitle: name,
        duration,
      };

      dummyFiles.push(fileData);
    } else if (handle.kind === "directory") {
      // Process the directory and add its content as a section
      const section = await processSection(name, handle);
      sections.push(section); // Add the processed directory as a section
    }
  }

  // Add dummySection to sections
  if (!_.isEmpty(dummyFiles)) {
    const sortedFiles = _.orderBy(dummyFiles, "title");
    dummySection.files = sortedFiles;
    sections.push(dummySection);
  }

  return _.orderBy(sections, "title", "asc");
};

const processSection = async (sectionTitle, dirHandle) => {
  const section = { title: sectionTitle };
  const files = [];

  for await (const [name, handle] of dirHandle.entries()) {
    if (handle.kind === "file") {
      const file = await handle.getFile();

      let duration = null;
      if (file.type.startsWith("video/")) {
        duration = await getVideoDuration(file);
      }

      const fileData = {
        title: name,
        sourceTitle: name,
        duration,
      };

      files.push(fileData);
    }
  }

  section.files = _.orderBy(files, "title");
  return section;
};
