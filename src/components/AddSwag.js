import React, { useState } from 'react';
import {
    Form,
    Button,
    Label,
    Input,
    FormGroup,
    FormFeedback,
} from "reactstrap";
import { storage, firestore } from '../services/Firebase.js';

const AddSwag = () => {

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [minDays, setMinDays] = useState(0);
    const [maxDays, setMaxDays] = useState(1);
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [images, setImages] = useState(null);
    const [adding, setAdding] = useState(false);

    const uploadFileAndGetDownloadURL = async (ref, file) => {
        const snap = await ref.put(file);
        const downloadURL = await snap.ref.getDownloadURL();
        return downloadURL;
    };

    const onAdd = async (e) => {
        e.preventDefault();
        setAdding(true);
        const promises = []

        const storageLocal = storage;
        Array.from(images).forEach(image => {
            const ref = storageLocal.ref(`images/${image.name}`)
            promises.push(uploadFileAndGetDownloadURL(ref, image))
        });

        const imageURL = await Promise.all(promises);

        const db = firestore;
        db.collection("posts").add({
            productName: productName,
            price: price,
            minDays: minDays,
            maxDays: maxDays,
            description: description,
            longitude: 0,
            latitude: 0,
            images: imageURL
        }).then(() => {
            console.log("Data added");
        }).catch(err => {
            console.error("Error adding data: ", err);
        })
        setAdding(false);
        return;
    }

    return (
        <div>
            <Form className="login-form" onSubmit={onAdd}>
                <h2 className="text-center m-4">Add Swag</h2>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Product Name</Label>
                    <Input
                        type="text"
                        value={productName}
                        placeholder="Product Name"
                        onChange={(e) => {
                            setProductName(e.target.value);
                        }}
                    ></Input>
                    <FormFeedback invalid>Please add a Product Name</FormFeedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Daily Price</Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">₹</div>
                        </div>
                        <Input
                            type="number"
                            id="inlineFormInputGroup"
                            value={price}
                            placeholder="Daily Price"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        ></Input>
                    </div>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Product Description</Label>
                    <Input
                        type="textarea"
                        rows="6"
                        value={description}
                        placeholder="Product Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Minimum Days</Label>
                    <Input
                        type="number"
                        value={minDays}
                        placeholder="Minimum Days"
                        onChange={(e) => {
                            setMinDays(e.target.value);
                        }}
                    ></Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Maximum Days</Label>
                    <Input
                        type="number"
                        value={maxDays}
                        placeholder="Minimum Days"
                        onChange={(e) => {
                            setMaxDays(e.target.value);
                        }}
                    ></Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Product Photos</Label>
                    <Input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            if (e.target.files) {
                                setImages(e.target.files);
                            }
                        }}
                        multiple
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label className="mb-1">Location</Label>

                </FormGroup>
                <div className="col text-center">
                    <Button
                        type="submit"
                        style={{ width: 150 }}
                        className=" m-3 btn-md btn-dark btn-block"
                    >
                        Add Swag
                    </Button>
                </div>
                <div className="text-center">
                    <div className="mt-2 mb-3">{/* <Notification /> */}</div>
                </div>
            </Form>
        </div>
    );
};

export default AddSwag;