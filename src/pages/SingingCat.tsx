import videoGato from "../assets/vid/snail car daily.mp4"

import "../assets/css/SingingCat/singingcat.css"

export function SingingCat() 
{
    return (
        <div className="video-container">
            <video 
                src={videoGato} 
                autoPlay={true} 
                loop={true} 
                muted={false} 
            />
        </div>
    );
}