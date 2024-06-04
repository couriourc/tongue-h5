import {atomWithStorage} from "jotai/vanilla/utils";
import {useAtom} from "jotai";

export interface IGoodsItem {
    data: string;
    name: string;
    pic: string;
}

export interface INeedParserFileInfo {
    base64: string;
}

export const atomNeedParserFileInfo = atomWithStorage("parser-result",
    {
        base64: ''
    }
);

/*@ts-ignore*/
export const useAtomNeedToParser = () => useAtom<INeedParserFileInfo>(atomNeedParserFileInfo);

export interface IParserResult {
    state: "yes" | "null";
    she: {
        chihen: string;
        dianci: string;
        houbotai: string;
        shese: string;
        taise: string;
    };
    result: {
        drinks: IGoodsItem[];
        sups: IGoodsItem[];
        translate: string;
    };
    ti_zhi: string;
}

export const atomParserResult = atomWithStorage<IParserResult>("parser-result", {
    state: "null",
    she: {
        chihen: "",
        dianci: "",
        houbotai: "",
        shese: "",
        taise: "",
    },
    result: {
        drinks: [] as IGoodsItem[],
        sups: [] as IGoodsItem[],
        translate: ''
    },
    ti_zhi: ""
});
export const useAtomParserResult = () => useAtom<IParserResult>(atomParserResult);
