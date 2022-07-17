import React, { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Row, Col, Button, Card,  CardBody, CardHeader, CardTitle, Input
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
// i18n 
import { withTranslation } from "react-i18next";
import {
  uploadDocsStart
} from "store/documents/actions";
function UploadKYC (props) {
  const dispatch = useDispatch();
  const refForm = useRef();

  const [memFiles, setMemFiles] = React.useState({});
  const addFile = (name, files) => {
    setMemFiles({
      ...memFiles,
      [name]: files,
    });
  };
  const uploadDoc = async () => {
    try {
      var formData = new FormData();
      formData.append("ID", memFiles["ID1"]);
      if (memFiles["ID2"]) {
        formData.append("ID", memFiles["ID2"]);
      }
      formData.append("ADDRESS", memFiles["ADDRESS"]);
      dispatch(uploadDocsStart({
        clientId: props.clientId,
        formData,
      }));
      // const tmp = await uploadDocuments(props.clientId, formData);
      // console.log("result ", tmp);
    } catch (error) {
    }
  };

  const resetForm = () => {
    setMemFiles({});
    refForm.current.reset();
  };
  useEffect(()=> {
    if (props.clear > 0) {
      resetForm();
    }
  }, [props.clear]);

  const [showKYC, setShowKYC] = React.useState(true);
  useEffect(()=>{
    if (props.clientDetails && props.clientDetails.stages) {
      if (props.clientDetails.stages.kycApproved) {
        setShowKYC(false);
      }
    }
  }, [props.clientDetails]);

  return (<React.Fragment>
    <AvForm
      style={{ height: "100%" }}
      ref={refForm}
      className='p-4'
      onValidSubmit={(e, v) => {
        uploadDoc(e, v);
      }}
    >
      <Row style={{ height: "100%" }}>
        <Card>
          <CardHeader className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <CardTitle>{props.t("KYC Documents")}</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="d-flex justify-content-center align-items-center">
            {showKYC && 
              <Row>
                <Col md="6" className="mb-3">
                      
                  {/* <AvField
                    name="ID.file1"
                    label={props.t("Proof of ID - Front Side")}
                    type="file"
                    onChange={(e)=>{addFile("ID1", e.target.files[0])}}
                    errorMessage={props.t("Please select file for ID Front")}
                    // validate={{ required: { value: true } }}
                  /> */}
                  <Input
                    className="form-control"
                    id="Proof_of_ID_front_side"
                    onChange={(e) => { addFile("ID1", e.target.files[0]) }}
                    tag={AvField}
                    errorMessage={props.t("Error in file")}
                    name="ID.file1"
                    label={props.t("Proof of ID - Front Side")}
                    type="file"
                  />
                      
                </Col>
                <Col md="6" className="mb-3">
                  {/* <AvField
                    name="ID.file2"
                    label={props.t("Proof of ID - Back Side")}
                    type="file"
                    onChange={(e)=>{addFile("ID2", e.target.files[0])}}
                    errorMessage={props.t("must file")}
                    // validate={{ required: { value: true } }}
                  /> */}
                  <Input
                    className="form-control"
                    id="Proof_of_ID_front_side"
                    tag={AvField}
                    name="ID.file2"
                    label={props.t("Proof of ID - Back Side")}
                    type="file"
                    onChange={(e)=>{addFile("ID2", e.target.files[0])}}
                    errorMessage={props.t("must file")}
                    // validate={{ required: { value: true } }}
                  />
                </Col>
                <Col md="6" className="mb-3">
                  {/* <AvField
                    name="ADDRESS.file1"
                    label={props.t("Proof of Address")}
                    type="file"
                    onChange={(e)=>{addFile("ADDRESS", e.target.files[0])}}
                    errorMessage={props.t("Please select file for proof of Address")}
                    // validate={{ required: { value: true } }}
                  /> */}
                  <Input
                    className="form-control"
                    id="Proof_of_ID_front_side"
                    tag={AvField}
                    name="ADDRESS.file1"
                    label={props.t("Proof of Address")}
                    type="file"
                    onChange={(e)=>{addFile("ADDRESS", e.target.files[0])}}
                    errorMessage={props.t("Please select file for proof of Address")}
                    // validate={{ required: { value: true } }}
                  />
                </Col>
                <Col md="12" className='text-center pt-3 p-2'>
                  <Row className="spacing">
                    <Col sm={6} xs={6}></Col>
                    <Col sm={6} xs={12} className="d-flex justify-content-between">
                      <Button disabled={props.uploading} type="button" className="w-md mb-2" onClick={resetForm} color="danger">
                        {props.t("Reset Form")}
                      </Button>
                      <Button disabled={props.uploading} type="submit" className="w-md mb-2" color="primary">
                        {props.t("Upload")}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            {!showKYC && <h2 className="">KYC documents Uploaded</h2>}
          </CardBody>
        </Card>
      </Row>
    </AvForm>
  </React.Fragment>);
}

function UploadAdditionalDocs (props) {
  const dispatch = useDispatch();
  const refForm = useRef();

  const [memFiles, setMemFiles] = React.useState({});
  const addFile = (name, files) => {
    setMemFiles({
      ...memFiles,
      [name]: files,
    });
  };

  const resetForm = () => {
    setMemFiles({});
    refForm.current.reset();
  };

  useEffect(()=> {
    if (props.clear > 0) {
      resetForm();
    }
  }, [props.clear]);
  const uploadDoc = async () => {
    try {
      var formData = new FormData();
      Object.keys(memFiles).forEach((key) => {
        for (let index = 0; index < memFiles[key].length; index++) {
          const file = memFiles[key][index];
          formData.append(key, file);
        }
      });
      dispatch(uploadDocsStart({
        clientId: props.clientId,
        formData,
      }));
      // const tmp = await uploadDocuments(props.clientId, formData);
      // console.log("result ", tmp);
    } catch (error) {
    }
  };
  const options = [{
    label: "Agreement",
    value: "AGREEMENT"
  }, {
    label: "World Check",
    value: "WORLD_CHECK"
  }, {
    label: "Source of Funds",
    value: "SOURCE_OF_FUNDS"
  }, {
    label: "Additional Documents",
    value: "ADDITIONAL_DOCUMENTS"
  }];
  return (<React.Fragment>
    <AvForm
      ref={refForm}
      className='p-4'
      onValidSubmit={(e, v) => {
        uploadDoc(e, v);
      }}
    >
      <Row>
        <Card>
          <CardHeader className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <CardTitle>{props.t("Other Documents")}</CardTitle>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              {options.map((obj, index) => <React.Fragment key={index}>
                <Col md={6} className="mb-3">
                  {/* <AvField
                    onChange={(e)=>{addFile(obj.value, e.target.files)}}
                    name={obj.value}
                    label={props.t(obj.label)}
                    type="file"
                    errorMessage={props.t("Error in file")}
                  /> */}
                  <Input
                    className="form-control"
                    id="Proof_of_ID_front_side"
                    onChange={(e) => { addFile(obj.value, e.target.files) }}
                    tag={AvField}
                    name={obj.value}
                    label={props.t(obj.label)}
                    type="file"
                    errorMessage={props.t("Error in file")}
                  />
                </Col>
              </React.Fragment>)}
              <Col md="12" className='text-center pt-3 p-2'>
                
                
                <Row className="spacing">
                  <Col sm={6} xs={6}></Col>
                  <Col sm={6} xs={12} className="d-flex justify-content-between">
                    <Button disabled={props.uploading} type="button" className="w-md mb-2" onClick={resetForm} color="danger">
                      {props.t("Reset Form")}
                    </Button>
                    <Button disabled={props.uploading} type="submit" className="w-md mb-2" color="primary">
                      {props.t("Upload")}
                    </Button>
                  </Col>
                </Row>
              </Col>
                  
            </Row>
          </CardBody>
        </Card>
      </Row>
    </AvForm>
  </React.Fragment>);
}

function ClientDetails(props) {

  // const [docType, setDocType] = React.useState(options[0]);

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <UploadKYC {...props} documents={props.documents} />
        </Col>
        <Col md={6}>
          <UploadAdditionalDocs {...props} documents={props.documents} />
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  uploading: state.documentsReducer.uploading,
  documents: state.documentsReducer.documents,
  clear: state.documentsReducer.clear,
  clientDetails: state.clientReducer.clientDetails,
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));