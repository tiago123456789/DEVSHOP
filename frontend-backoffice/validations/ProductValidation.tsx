import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().min(3).required(),
    description: yup.string().min(20).required(),
});