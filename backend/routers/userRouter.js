import express from "express"
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/new", isAdminAuthenticated, addNewAdmin);
router.get("/clients", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout",isPatientAuthenticated, logoutPatient);
router.post("/client/addnew", isAdminAuthenticated, addNewDoctor);

export default router;