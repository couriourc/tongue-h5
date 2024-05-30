import {atomWithStorage} from "jotai/vanilla/utils";
import {useAtom} from "jotai";

export interface IGoodsItem {
    data: string;
    name: string;
    pic: string;
}

export interface IParserResult {
    state: "yes" | "no";
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
}

export const atomParserResult = atomWithStorage("parser-result",
    {
        state: "yes",
        she: {
            chihen: "",
            dianci: "",
            houbotai: "",
            shese: "",
            taise: "",
        },
        result: {
            drinks: [] as string[],
            sups: [] as string[],
            translate: ''
        }
    }
);

/*@ts-ignore*/
export const useAtomParserResult = () => useAtom<IParserResult>(atomParserResult);
