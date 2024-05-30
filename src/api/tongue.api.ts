import {requester} from "@/api/requester";
import * as v from "valibot";


export const IPostTongueDetection = v.object({
    file: v.custom((target: unknown) => {
        return target instanceof File;
    })
});

function obj2form(target: object) {
    const formData = new FormData();

    for (let each in target) {
        if (!target[each as keyof typeof target]) continue;
        formData.append(each, target[each as keyof typeof target]);
    }
    return formData;
}

export const postTongueDetection = (data: v.InferInput<typeof IPostTongueDetection>) => requester.post("/tongue_detection",
    obj2form(v.parse(IPostTongueDetection, data)),
    {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
