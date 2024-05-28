import {cx} from "@emotion/css";

export default function Home() {

    return <section className={cx('flex flex-col items-center gap-12px relative')}>
        <div className={cx("bg-primary h-35vh w-full")}>Welcome to 汉方</div>
        <div className={cx("bg-white h-200px w-full")}></div>
        <div className={cx("")}></div>
    </section>;
}

