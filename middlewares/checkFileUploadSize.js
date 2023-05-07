const { debugLog } = require("../config/env_variables");
const { failureResponse, statusCodes, serverFailure } = require("../utils/api-response");

function checkFileUploadSize(req, res, next) {
  try {
    if (req.files) {
      const { files } = req;

      const fileKeys = Object.keys(files);

      const allowedFileTypes = ["image"];

      fileKeys.forEach(key => {
        // grab fileType from file
        let fileType = files[key].mimetype;

        const fileTypeIndex = allowedFileTypes.indexOf(fileType);

        if (fileTypeIndex === -1) {
          return failureResponse(res, statusCodes.BAD_REQUEST, "file type not allowed");
        }

        if (fileTypeIndex === 0) {
          const fileSize = files[key].size;
          // limit to 5mb
          if (fileSize > 5242880) {
            return failureResponse(res, statusCodes.BAD_REQUEST, "image file too big");
          }
        }
      });
    }

    next();
  } catch (error) {
    if (debugLog) {
      console.log({ error });
    }
    return serverFailure(res);
  }
}

module.exports = {
  checkFileUploadSize
};
