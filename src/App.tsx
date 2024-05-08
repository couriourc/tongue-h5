import {useRef, useState} from 'react';
import './App.css';
import {Camera} from "react-camera-pro";
import {CiCamera} from "react-icons/ci";

function App() {

    const camera = useRef<any>(null);
    const [image, setImage] = useState<string>("");

    return (
        <>
            <div className="flex flex-col h-screen w-screen overflow-hidden">
                <Camera ref={camera}
                        errorMessages={{
                            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                            switchCamera:
                                'It is not possible to switch camera to different one because there is only one video device accessible.',
                            canvas: 'Canvas is not supported.'
                        }}

                />
                <div className={'fixed bg-[#0000008e] h-screen w-screen pointer-events-none z-0'}>
                </div>
                <button
                    className={`
                    absolute rounded-full bg-transparent  border-1px
                    w-5em h-5em outline-none border-none bottom-4em left-50% -translate-x-50% 
                    hover:border-solid cursor-pointer z-100`}
                    onClick={() => setImage(camera.current!.takePhoto())}>
                    <CiCamera size={40} color={'#FFF'}/>
                </button>
                {image && <img src={image!} alt="Taken photo"/>}
            </div>
        </>
    );
}

export default App;
