import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { Formik, Form, useField } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Reusable component for TextInput
const FormikTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <Label htmlFor={props.name} className="mb-1 block">
                {label}
            </Label>
            <TextInput {...field} {...props} id={props.name} />
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
        </div>
    );
};

// Reusable component for Textarea
const FormikTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <Label htmlFor={props.name} className="mb-1 block">
                {label}
            </Label>
            <Textarea {...field} {...props} id={props.name} />
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
        </div>
    );
};

// Reusable component for Select
const FormikSelect = ({ label, children, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <Label htmlFor={props.name} className="mb-1 block">
                {label}
            </Label>
            <Select {...field} {...props} id={props.name}>
                {children}
            </Select>
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
        </div>
    );
};

const CarPost = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const isCarOwner = localStorage.getItem("carOwner") == true;

        // if (!token || !isCarOwner) {
        //     alert("Access denied. Only car owners can post a car.");
        //     navigate("/");
        // }
    }, [navigate]);

    const initialValues = {
        brand: "",
        model: "",
        category: "",
        availableAt: "",
        year: 2020,
        pricePerDay: 0,
        description: "",
        licensePlate: "",
        seats: 4,
        fuelType: "",
        transmission: "Manual",
        doors: 4,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const carData = {
            ...values,
            isRented: false,
            availableAt: new Date(values.availableAt).toISOString(),
            ownerId: parseInt(userId),
            transmission: values.transmission === "Manual" ? "Manual" : "Automatic",
        };

        try {
            const response = await fetch("http://localhost:5112/api/Car", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                alert("Car posted successfully!");
                navigate("/");
            } else {
                const error = await response.json();
                alert("Failed to post car: " + (error.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error.");
        }

        setSubmitting(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Post Your Car</h1>

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            <FormikTextInput name="brand" label="Brand" type="text" />
                            <FormikTextInput name="model" label="Model" type="text" />
                            <FormikTextInput name="category" label="Category" type="text" />
                            <FormikTextInput
                                name="availableAt"
                                label="Available At"
                                type="datetime-local"
                            />
                            <FormikTextInput name="year" label="Year" type="number" />
                            <FormikTextInput name="pricePerDay" label="Price Per Day" type="number" />
                            <FormikTextInput name="licensePlate" label="License Plate" type="text" />
                            <FormikTextInput name="seats" label="Seats" type="number" />
                            <FormikTextInput name="fuelType" label="Fuel Type" type="text" />
                            <FormikTextInput name="doors" label="Doors" type="number" />

                            <FormikTextarea name="description" label="Description" />

                            <FormikSelect name="transmission" label="Transmission">
                                <option value="">Select</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </FormikSelect>

                            <div className="flex justify-center mt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2"
                                >
                                    {isSubmitting ? "Posting..." : "Post Car"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default CarPost;
