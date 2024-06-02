import requester from "@/api/requester";
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

export const postTongueSuccess = (data: v.InferInput<typeof IPostTongueDetection>) => requester.post<any>("/tongue_success", obj2form(v.parse(IPostTongueDetection, data)), {
    headers: {
        "Content-Type": "image/jpeg"
    }
});

export interface IGetTongueDetectionItem {
    title: string;
    jpg: string;
    url: string;
    time: string;
}

export const getTongueDetection = () => requester.get<IGetTongueDetectionItem[]>("/tongue_detection");

export interface IPostMakePdf {
}

export const postMakePdf = (data: IPostMakePdf) => requester.post<Blob>
("/make_pdf", data, {
    responseType: "blob"
});
