import {NavBar} from "@/components/Navbar";
import {Grid, Typography} from "react-vant";
import {css, cx} from "@emotion/css";
import FacePlaceholder from "@/assets/face-placeholder.png";
import Food from "@/assets/food.png";

export function Result() {

    const grids = [
        {label: "舌色", content: "淡黄"},
        {label: "点刺", content: "不明显"},
        {label: "裂纹", content: "较明显"},
        {label: "苔色", content: "白"},
        {label: "苔质", content: "薄腻"},
        {label: "齿痕", content: "不明显"},
    ] as const;


    return <>
        <NavBar title={'舌像综合分析'}></NavBar>
        <section text={"#333333"}>
            <main px-32px flex flex-col gap-36px>
                <div className={'bg-white w-full rounded-16px min-h-528px '}>
                    <div w-full bg={"#E2AF6E4D"} h-260px rounded-16px px-32px flex flex-row items-center gap-56px>
                        <div size-160px bg={"#FFFFFFCC"} rounded-full flex-center>
                            <img alt={'preview'} src={FacePlaceholder} w-128px></img>
                        </div>
                        <div flex flex-col gap-30px>
                            <div flex flex-col gap-10px justify-between>
                                <span text-24px>舌苔证型：</span>
                                <span color={"#BF6B00"} text-32px>气血不足、体内有热</span>
                                <span text-16px>上传时间：2024-05-06 11:14</span>
                            </div>
                            <button bg-primary w-fit border-none outline-none rounded-20px py-6px px-16px text-white
                                    text-24px>重新拍摄
                            </button>
                        </div>
                    </div>
                    <div size-full px-24px pb-20px>
                        <Grid columnNum={3}
                              border={false}
                              center={false}
                        >
                            {
                                grids.map(({label, content}, index) => {
                                    return <Grid.Item key={label}
                                                      className={cx("border-1px border-b-solid border-#E2AF6E",
                                                          index > (grids.length - 1 - 3) ?
                                                              css`
                                                                  border: none;
                                                              ` : ""
                                                      )}>
                                        <div h-78px flex flex-col>
                                            <span text={"24px #666666"}>{label}</span>
                                            <span text-32px>{content}</span>
                                        </div>
                                    </Grid.Item>;
                                })
                            }
                        </Grid>
                    </div>
                </div>

                <div min-h-183px card-base>
                    <Typography.Text text-primary text-32px>舌像释义</Typography.Text>
                    <Typography.Text text-24px
                                     mt-26px>根据舌像显示，您舌质淡白提示气血不足，裂纹舌提示血虚不润，黄腻苔提示稍有湿热</Typography.Text>
                </div>
                <div min-h-183px card-base>
                    <Typography.Text text-primary text-32px>健康建议</Typography.Text>
                    <Typography.Text text-24px
                                     mt-26px>气血虚弱、血虚不润、稍有湿热的人群可能存在糖脂代谢紊乱的风险。</Typography.Text>
                </div>
                <div min-h-183px card-base>
                    <Typography.Text text-primary text-32px>食疗果饮</Typography.Text>
                    <Typography.Text text-24px
                                     mt-26px>气血虚弱、血虚不润、稍有湿热的人群可能存在糖脂代谢紊乱的风险。</Typography.Text>
                    <div className={'mt-32px max-w-685px flex gap-74px overflow-x-auto overflow-y-hidden'}>

                        {
                            new Array(10).fill(1).map((_, index) => {
                                return <div key={index} w-100px flex flex-col items-center>
                                    <div size-100px border-1px border-primary border-solid rounded-full p-7px
                                         flex-center
                                         overflow-hidden>
                                        <img src={Food} alt={'food'} w-80px/>
                                    </div>
                                    <span mt-16px text-24px>百合</span>
                                    <span text={"#999999"} text-16px>润肺止咳</span>
                                </div>;
                            })
                        }

                    </div>
                </div>
                <div min-h-183px card-base>
                    <Typography.Text text-primary text-32px>推荐汤品</Typography.Text>
                    <Typography.Text text-24px
                                     mt-26px>气血虚弱、血虚不润、稍有湿热的人群可能存在糖脂代谢紊乱的风险。</Typography.Text>
                    <div className={'mt-32px max-w-685px flex gap-74px overflow-x-auto overflow-y-hidden'}>

                        {
                            new Array(10).fill(1).map((_, index) => {
                                return <div key={index} w-100px flex flex-col items-center>
                                    <div size-100px border-1px border-primary border-solid rounded-full p-7px
                                         flex-center
                                         overflow-hidden>
                                        <img src={Food} alt={'food'} w-80px/>
                                    </div>
                                    <span mt-16px text-24px>百合</span>
                                    <span text={"#999999"} text-16px>润肺止咳</span>
                                </div>;
                            })
                        }

                    </div>
                </div>

            </main>
        </section>
    </>;
}
