import {useRef, useState} from 'react';
import './App.css';
import {Camera} from "react-camera-pro";


function App() {

    const camera = useRef<any>(null);
    const [image, setImage] = useState<string>("");

    return (
        <>
            <div className="flex flex-col  ">
                <Camera ref={camera}
                        errorMessages={{
                            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                            switchCamera:
                                'It is not possible to switch camera to different one because there is only one video device accessible.',
                            canvas: 'Canvas is not supported.'
                        }}

                />
                <button className={'absolute rounded-full w-5em h-5em outline-none border-none drop-shadow-lg bottom-4em left-50% -translate-x-50%'}
                        onClick={() => setImage(camera.current!.takePhoto())}/>
                {image && <img src={image!} alt="Taken photo"/>}
            </div>
        </>
    );
}

export default App;
