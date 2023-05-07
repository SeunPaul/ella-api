const db = require("../config/db");
const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");

const getDiagnosisData = statusCode => {
  if (statusCode === 0) {
    return { diagnosis_outcome: "Tumor", comment: "This patient has a tumor" };
  }

  if (statusCode === 1) {
    return { diagnosis_outcome: "Malignant Tumor", comment: "This patient has a malignant tumor" };
  }

  if (statusCode === 2) {
    return { diagnosis_outcome: "Cancer", comment: "This patient has a cancer" };
  }

  if (statusCode === 3) {
    return {
      diagnosis_outcome: "Malignant Cancer",
      comment: "This patient has a malignant cancer"
    };
  }

  return { diagnosis_outcome: "No Diagnosis", comment: "This patient has been diagnosed clear" };
};

exports.runScan = async (req, res) => {
  try {
    const { type, patient_name, patient_age, mdcp, sdg, mst, mat, mvr, msc, mnc } = req.body;
    if (!patient_name || !patient_age) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "provide patient's name and age");
    }

    if (type === "value") {
      if (!mdcp || !sdg || !mst || !mat || !mvr || !msc || !mnc) {
        return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
      }

      // run AI analysis
      // ...............
      // use response code from analysis
      const responseCode = 2;

      const { diagnosis_outcome, comment } = getDiagnosisData(responseCode);

      await db("diagnosis").insert({
        patient_name,
        patient_age,
        status_code: responseCode,
        diagnosis_outcome,
        comment,
        created_at: new Date()
      });

      return successResponse(res, statusCodes.SUCCESS, "diagnosis successful", {});
    }

    if (type === "mammogram") {
      if (!req.files.mammogram) {
        return failureResponse(res, statusCodes.BAD_REQUEST, "Provide a mammogram");
      }

      // run AI analysis
      // ...............
      // use response code from analysis
      const responseCode = 2;

      const { diagnosis_outcome, comment } = getDiagnosisData(responseCode);

      await db("diagnosis").insert({
        patient_name,
        patient_age,
        status_code: responseCode,
        diagnosis_outcome,
        comment,
        created_at: new Date()
      });

      return successResponse(res, statusCodes.SUCCESS, "diagnosis successful", {});
    }

    return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid scan type");
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const allDiagonosis = await db("diagnosis").select().orderBy("created_at");
    return successResponse(res, statusCodes.SUCCESS, `dashboard stats fetched`, { allDiagonosis });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
