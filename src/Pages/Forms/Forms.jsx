import React, { useState } from "react";
import {
	Divider,
	Form,
	Row,
	Col,
	Select,
	Input,
	Button,
	DatePicker,
	Upload
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { Space, Table, Tag } from "antd";
import "./Forms.css";
import logo from "../../assets/prodoc.png";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

export const Forms = () => {
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const [type, setType] = useState("Doctor");
	const [name, setName] = useState("");
	const [hosname, setHosname] = useState("");
	const [special, setSpecial] = useState("");
	const [city, setCity] = useState("Bangalore");
	const [locality, setLocality] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [docemail, setDocemail] = useState("");
	const [docphone, setDocphone] = useState("");
	const [summary, setSummary] = useState("");
	const { isLoaded } = useJsApiLoader({
		libraries: ["places"],
		googleMapsApiKey: "AIzaSyALpo0qUtWD76F0hQv37ybTDfMyTnrLb58"
	});

	if (!isLoaded) {
		return <div>hi</div>;
	}

	const send_data = async () => {
		if (
			name == "" ||
			hosname == "" ||
			special == "" ||
			city == "" ||
			locality == "" ||
			docphone == ""
		) {
			toast.error("Fill out all the required feilds");
			return;
		}

		if (!isValidEmail(docemail)) {
			toast.error("email is not valid");
			return;
		}
		try {
			const value = {
				doctor_name: name,
				specialization: special,
				practice: {
					city: city,
					locality: locality
				},
				lat: lat,
				lng: lng,
				clinic_name: hosname,
				docemail: docemail,
				docphone: docphone,
				summary: summary
			};

			console.log(value);

			const response = await fetch(`${api}add_doc`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(value)
			})
				.then((data) => data.json())
				.then((res) => {
					if (res.status === true) {
						form.resetFields();
						toast.success("Doctor Added Successfully");
						setDb_doc((prevDocuments) => [...prevDocuments, res.user]);
					} else {
						toast.error(res.message);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="landingpage">
			<Toaster></Toaster>
			<div className="navbar">
				<div className="nav-logo">
					<img src={logo} alt="" />
					<div className="nav-title">
						<span>Prodoc.ai</span>
						<span className="beta-tag">Alpha</span>
					</div>
				</div>
			</div>
			<div style={{ marginTop: "40px" }}></div>
			<Divider orientation="left">Get Listed As ?</Divider>
			<div style={{ marginTop: "20px" }}></div>
			<div className="doc-input">
				<div className="addinuser">
					<div className="inputele">
						<Form form={form} onFinish={null} autoComplete="off">
							<Row gutter={[32, 16]}>
								<Col span={12}>
									<Form.Item
										label={"Choose Type"}
										name={"Choose Type"}
										rules={[{ required: true }]}
									>
										<Select
											onChange={(e) => {
												setType(e);
											}}
											value={type}
											// placeholder="Choose"
											defaultValue={"Doctor"}
										>
											<Select.Option value={"Doctor"}>Doctor</Select.Option>
											<Select.Option value={"Hospital"}>Hospital</Select.Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}></Col>
							</Row>
						</Form>
					</div>
				</div>
			</div>
			{type == "Doctor" ? (
				<>
					<Divider orientation="left">Add Doctor Information</Divider>
					<div style={{ marginTop: "40px" }}></div>
					<div className="doc-input">
						<div className="addinuser">
							<div className="inputele">
								<Form form={form} onFinish={null} autoComplete="off">
									<Row gutter={[32, 16]}>
										<Col span={12}>
											<Form.Item
												label={"Name"}
												name={"Name"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setName(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Doctor Name"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Specialization"}
												name={"Specialization"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setSpecial(e.target.value);
													}}
													value={"Specialization"}
													style={{ width: "100%" }}
													placeholder="Specialization"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Email ID"}
												name={"Email"}
												rules={[{ required: true }]}
											>
												<Space.Compact style={{ width: "100%" }}>
													<Input
														onChange={(e) => {
															setDocemail(e.target.value);
														}}
														style={{ width: "100%" }}
														placeholder="Email ID"
													></Input>
													<Button type="primary">Verify</Button>
												</Space.Compact>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Phone Number"}
												name={"Phone"}
												rules={[{ required: true }]}
											>
												<Space.Compact style={{ width: "100%" }}>
													<Input
														onChange={(e) => {
															setDocphone(e.target.value);
														}}
														prefix="+91"
														style={{ width: "100%" }}
														// placeholder="Phone Number"
													></Input>
													<Button type="primary">Verify</Button>
												</Space.Compact>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Education"}
												name={"Education"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setDocphone(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Education Eg; MBBS, MS, MD, etc"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item label={"Summary"} name={"Summary"}>
												<TextArea
													onChange={(e) => {
														setSummary(e.target.value);
													}}
													placeholder="Summary About the Doctor"
													autoSize={{ minRows: 3, maxRows: 5 }}
												/>
											</Form.Item>
										</Col>
										<Col span={12}></Col>
									</Row>
								</Form>
							</div>
						</div>
					</div>
					<Divider orientation="left">Add Doctor Location Info</Divider>
					<div style={{ marginTop: "40px" }}></div>
					<div className="doc-input" style={{ marginBottom: "100px" }}>
						<div className="addinuser">
							<div className="inputele">
								<Form form={form} onFinish={null} autoComplete="off">
									<Row gutter={[32, 16]}>
										<Col span={12}>
											<Form.Item
												label={"Search Location"}
												name={"location"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setName(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Location"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"City"}
												name={"City"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setSpecial(e.target.value);
													}}
													value={"City"}
													style={{ width: "100%" }}
													placeholder="City"
												></Input>
											</Form.Item>
										</Col>

										{/* <Col span={12}>
									<Form.Item
										label={"Hospital Name"}
										name={"Hospital Name"}
										rules={[{ required: true }]}
									>
										<Autocomplete>
											<Input
												onChange={(e) => {
													setHosname(e.target.value);
												}}
												// value={"hos_name"}
												style={{ width: "100%" }}
												// placeholder="Hospital Name"
											></Input>
										</Autocomplete>
									</Form.Item>
								</Col>

								<Col span={12}>
									<Form.Item label={"City"} name={"City"} required>
										<Input
											onChange={(e) => {
												setCity(e.target.value);
											}}
											value={"City"}
											style={{ width: "100%" }}
											placeholder="City"
										></Input>
									</Form.Item>
								</Col> */}
										<Col span={12}>
											<Form.Item
												label={"State"}
												name={"State"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setDocemail(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="State"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Pincode"}
												name={"Pincode"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setDocphone(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Pin-Code"
												></Input>
											</Form.Item>
										</Col>

										<Col span={12}></Col>
									</Row>
									<Form.Item>
										<div className="addindibtn">
											<Button htmlType="reset">Reset</Button>
											<div style={{ width: "10px" }}></div>
											<Button
												htmlType="submit"
												type="primary"
												onClick={() => {
													send_data();
												}}
											>
												Add Doctor Info
											</Button>
										</div>
									</Form.Item>
								</Form>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<Divider orientation="left">Add Hospital Information</Divider>
					<div style={{ marginTop: "40px" }}></div>
					<div className="doc-input">
						<div className="addinuser">
							<div className="inputele">
								<Form form={form} onFinish={null} autoComplete="off">
									<Row gutter={[32, 16]}>
										<Col span={12}>
											<Form.Item
												label={"Name"}
												name={"Name"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setName(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Doctor Name"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Specialization"}
												name={"Specialization"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setSpecial(e.target.value);
													}}
													value={"Specialization"}
													style={{ width: "100%" }}
													placeholder="Specialization"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Email ID"}
												name={"Email"}
												rules={[{ required: true }]}
											>
												<Space.Compact style={{ width: "100%" }}>
													<Input
														onChange={(e) => {
															setDocemail(e.target.value);
														}}
														style={{ width: "100%" }}
														placeholder="Email ID"
													></Input>
													<Button type="primary">Verify</Button>
												</Space.Compact>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Phone Number"}
												name={"Phone"}
												rules={[{ required: true }]}
											>
												<Space.Compact style={{ width: "100%" }}>
													<Input
														onChange={(e) => {
															setDocphone(e.target.value);
														}}
														prefix="+91"
														style={{ width: "100%" }}
														// placeholder="Phone Number"
													></Input>
													<Button type="primary">Verify</Button>
												</Space.Compact>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item label={"Summary"} name={"Summary"}>
												<TextArea
													onChange={(e) => {
														setSummary(e.target.value);
													}}
													placeholder="Summary About the Doctor"
													autoSize={{ minRows: 3, maxRows: 5 }}
												/>
											</Form.Item>
										</Col>
										<Col span={12}></Col>
									</Row>
								</Form>
							</div>
						</div>
					</div>
					<Divider orientation="left">Add Hospital Location Info</Divider>
					<div style={{ marginTop: "40px" }}></div>
					<div className="doc-input" style={{ marginBottom: "100px" }}>
						<div className="addinuser">
							<div className="inputele">
								<Form form={form} onFinish={null} autoComplete="off">
									<Row gutter={[32, 16]}>
										<Col span={12}>
											<Form.Item
												label={"Search Location"}
												name={"location"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setName(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Location"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"City"}
												name={"City"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setSpecial(e.target.value);
													}}
													value={"City"}
													style={{ width: "100%" }}
													placeholder="City"
												></Input>
											</Form.Item>
										</Col>

										{/* <Col span={12}>
							<Form.Item
								label={"Hospital Name"}
								name={"Hospital Name"}
								rules={[{ required: true }]}
							>
								<Autocomplete>
									<Input
										onChange={(e) => {
											setHosname(e.target.value);
										}}
										// value={"hos_name"}
										style={{ width: "100%" }}
										// placeholder="Hospital Name"
									></Input>
								</Autocomplete>
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label={"City"} name={"City"} required>
								<Input
									onChange={(e) => {
										setCity(e.target.value);
									}}
									value={"City"}
									style={{ width: "100%" }}
									placeholder="City"
								></Input>
							</Form.Item>
						</Col> */}
										<Col span={12}>
											<Form.Item
												label={"State"}
												name={"State"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setDocemail(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="State"
												></Input>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label={"Pincode"}
												name={"Pincode"}
												rules={[{ required: true }]}
											>
												<Input
													onChange={(e) => {
														setDocphone(e.target.value);
													}}
													style={{ width: "100%" }}
													placeholder="Pin-Code"
												></Input>
											</Form.Item>
										</Col>

										<Col span={12}></Col>
									</Row>
									<Form.Item>
										<div className="addindibtn">
											<Button htmlType="reset">Reset</Button>
											<div style={{ width: "10px" }}></div>
											<Button
												htmlType="submit"
												type="primary"
												onClick={() => {
													send_data();
												}}
											>
												Add Hospital Info
											</Button>
										</div>
									</Form.Item>
								</Form>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
