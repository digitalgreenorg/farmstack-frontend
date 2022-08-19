import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import GuestUserBanner from "../../Components/GuestUser/GuestUserBanner";
import GuestUserDescription from "../../Components/GuestUser/GuestUserDescription";
import GuestUserLegalPage from "../../Components/GuestUser/GuestUserLegalPage";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";

export default function GuestUserLegal(props){
    const [isLoader, setIsLoader] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)
    const [backendReady, setBackendReady] = useState(false)
    const [content, setContent] = useState([])
    const [documents, setDocuments] = useState([])
    const history = useHistory();
    
    
    // let arr = [
        
    //     {title:"Governing Laws", content:"Governing Laws are meant for the....", download:"media/documents/governing_law.pdf"},
    //     {title:"Warranties", content:"Rich text Warranties...", download:"media/documents/privacy_policy.pdf"},
    //     {title:"Limitation of Liabilities", content:"Rich text content...", download:"media/documents/tos.pdf"},
    //     {title:" Policy", content:"Rich text content...", download:"media/documents/limitations_of_liabilities.pdf"},
    //     {title:"Terms of Use", content:"Rich text content...", download: "media/documents/warranty.pdf"},
        
    // ]
    const [legalData, setLegalData] = useState([])


    const getLegalData =  () => {
        
            setIsLoader(true)
            HTTPService(
                "GET",
                UrlConstant.base_url + UrlConstant.microsite_legal_documents,
                // "https://1eb8-106-51-85-143.in.ngrok.io/microsite/legal_documents/",
                "",
                false,
                false
              )
                .then((response) => {
                  console.log(response, "updated responmse")
                  response = response.data
                 

   
    // console.log(arr)
                  // console.log(admin)
                  // setIsLoader(false);
      
      
              

                  let arr = [
                      
                      {title:"Governing Laws", content:response.Content.governing_law, download:response.Documents.governing_law},
                      {title:"Warranties", content:response.Content.warranty, download:response.Documents.warranty},
                      {title:"Limitation of Liabilities", content:response.Content.limitations_of_liabilities, download:response.Documents.limitations_of_liabilities},
                      {title:"Policy", content:response.Content.privacy_policy, download:response.Documents.privacy_policy},
                      {title:"Terms of Use", content:response.Content.tos, download: response.Documents.tos},
                      
                  ]
                  setLegalData([...arr])

                  setIsLoader(false);
                })
                .catch((e) => {
                  setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
                });
        }
      useEffect(() => {
        getLegalData()

      },[]);
    return(
        <div className="center_keeping_conatiner">
        {isLoader ? <Loader /> : ""}
        <GuestUserNavBar />
        <GuestUserBanner />
        <GuestUserLegalPage legalData={legalData}/>
        <Footer disableLegalLink={true}/>
        </div>
    );
}