import { useFormik } from "formik";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Upload } from "upload-js";
import gallery from "../../Assets/Images/gallery-export.svg";
import api from "../../hooks/useAxios";
import useAuth from './../../hooks/useAuth';

const Admin = () => {
   const {logout} = useAuth();
   const [picUploading1, setPicUploading1] = useState(false);
   const [error, setError] = useState("");
 const LogOut = () => {
    logout();
 };
   const [imgaeFile, setImageFile] = useState();

   const handleForm = useFormik({
      initialValues: {
         title: "",
         paragraph: "",
         img: "",
      },
      onSubmit: (values) => {
         values.img = imgaeFile;

         console.log(values);
         if (
            values.title !== "" &&
            values.paragraph !== "" &&
            values.img !== ""
         ) {
            api.post("/placeorder/1", values).then((res) => {
               if (res.data.acknowledged) {
                  alert("Submitted");
                  setError("");
                  handleForm.resetForm();
               }
            });
         } else if (
            values.title === "" ||
            values.paragraph === "" ||
            values.img === ""
         ) {
            setError("Required Field!");
         }

         // setStoreData({ ...storeData});
      },
      enableReinitialize: true,
   });

   // const imageStorageKey = "6d207e02198a847aa98d0a2a901485a5";

   // const handleFileRead = async (e) => {

   // };
   var upload = new Upload({
      apiKey: "public_kW15azHFvPXUytCCop9DMZ8wCxzF",
   });

   async function onFileSelected(event) {
      const [file] = event.target.files;
      const { fileUrl } = await upload.uploadFile(file);
      console.log(`File uploaded: ${fileUrl}`);
      setImageFile(fileUrl);
      setPicUploading1(true);
   }

   return (
      <div>
         <Container className="py-5">
            <div className="">
               <h1 className="text-decoration-underline">Add Information</h1>
            </div>
            <div className="flex justify-content-center align-items-center py-3">
               <form onSubmit={handleForm.handleSubmit}>
                  <div className="mb-4 pt-4">
                     <div class="form-floating mb-3">
                        <input
                           type="text"
                           class="form-control"
                           id="floatingInput"
                           placeholder="name@example.com"
                           value={handleForm.values.title}
                           onChange={handleForm.handleChange}
                           name="title"
                        />
                        <label for="floatingInput">Title</label>
                     </div>
                     <div class="form-floating">
                        <textarea
                           type="text"
                           class="form-control"
                           id="floatingPassword"
                           placeholder="paragraph"
                           value={handleForm.values.paragraph}
                           onChange={handleForm.handleChange}
                           name="paragraph"
                        />
                        <label for="floatingPassword">Paragraph</label>
                     </div>
                  </div>
                  <br />
                  {/* Uplaoding Thumbnail */}
                  <div className="d-inline-block">
                     <h4 className="">Upload Image</h4>
                     <div
                        className=""
                        onClick={() => {
                           const butt1 =
                              document.getElementById("upload-thumbnail");
                           butt1.click();
                        }}
                        style={{ cursor: "pointer" }}
                     >
                        <p className="new-business-border d-inline-block ">
                           {picUploading1 ? (
                              <div className="w-[150px] h-[150px] border border-dark ">
                                 <img width="200px" src={imgaeFile} alt="" />
                              </div>
                           ) : (
                              <div className="w-[150px] h-[150px] p-4 border border-dark">
                                 <img src={gallery} alt="" />
                              </div>
                           )}
                        </p>
                     </div>
                  </div>
                  <div className="">
                     <button
                        className="py-[6px] px-[130px] bg-black text-white rounded-[10px] "
                        onClick={handleForm.handleSubmit}
                     >
                        Submit Information
                     </button>
                  </div>
                  <div
                     style={{
                        display: "none",
                     }}
                  >
                     <input
                        type="file"
                        id="upload-thumbnail"
                        accept=".png, .jpg, .jpeg"
                        onChange={(event) => onFileSelected(event)}
                     />
                  </div>
                  <div
                     className="container py-3"
                     style={{
                        position: "absolute",
                        overflow: "hidden",
                        left: 1300,
                        top: 60,
                     }}
                  >
                     <button
                        type="button"
                        class="btn btn-dark"
                        onClick={LogOut}
                     >
                        Log out
                     </button>
                  </div>
               </form>
            </div>
         </Container>
      </div>
   );
};

export default Admin;
