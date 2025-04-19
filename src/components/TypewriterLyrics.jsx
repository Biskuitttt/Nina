    import React, { useEffect, useRef, useState } from 'react';
    import './style.css';

    const syncedLyrics = [
    { time: 2, text: "This is made for you", image: "/img/chair.jpg"  },
    { time: 8, text: "Yea, you", image: "/img/you.jpg"  },
    { time: 13, text: "And only you", image: "/img/cry.jpg"  },
    { time: 16, text: "Cuz you matter for me", image: "/img/cry.jpg"  },
    { time: 18, text: "Enjoy <3", image: "/img/cry.jpg"  },
    { time: 21, text: "Saat engkau tertidur", image: "/img/cry.jpg" },
    { time: 27, text: "Aku pergi menghibur", image: "/img/birb.jpg" },
    { time: 32, text: "Beda kota, pisah raga, bukan masalahku"},
    { time: 37, text: "Lihat wajahmu di layar, ku tetap bersyukur", image: "/img/vidcall.jpg" },
    { time: 42, text: "Saat engkau terjaga", image: "/img/vidcall.jpg" },
    { time: 48, text: "Aku 'kan ada di sana" },
    { time: 53, text: "Sempatkan bermain dan bawakan cendera mata" },
    { time: 58, text: "Satu sampai lima tahun, cepat tak terasa" },
    { time: 64, text: "Segala hal kuupayakan untuk melindungi" },
    { time: 74, text: "Tunggu aku kembali lagi esok pagi" },
    { time: 85, text: "Tumbuh lebih baik, cari panggilanmu" },
    { time: 91, text: "Jadi lebih baik dibanding diriku" },
    { time: 96, text: "'Tuk sementara ini aku mengembara jauh" },
    { time: 109, text: "Saat dewasa kau 'kan mengerti" },
    { time: 122, text: "Saat engkau dewasa" },
    { time: 128, text: "Dan aku kian menua" },
    { time: 133, text: "Jika ku berpulang lebih awal, tidak apa" },
    { time: 138, text: "Berjumpa lagi di sana, aku tetap sama" },
    { time: 144, text: "Saat engkau teringat" },
    { time: 149, text: "Tengkar kita, manakala" },
    { time: 154, text: "Maaf atas perjalanan yang tidak sempurna" },
    { time: 159, text: "Namun percayalah, untukmu kujual dunia" },
    { time: 165, text: "Segala hal kuupayakan untuk melindungi" },
    { time: 175, text: "Tunggu aku kembali lagi esok pagi" },
    { time: 181, text: "Selalu janjiku pada dirimu" },
    { time: 186, text: "Tumbuh lebih baik, cari panggilanmu" },
    { time: 192, text: "Jadi lebih baik dibanding diriku" },
    { time: 197, text: "Dan tertawalah saat ini selepas-lepasnya" },
    { time: 210, text: "Kar'na kelak kau 'kan tersakiti" },
    { time: 215, text: "Aku tahu kamu hebat" },
    { time: 218, text: "Namun, s'lamanya diriku pasti berkutat" },
    { time: 223, text: "'Tuk s'lalu jauhkanmu dari dunia yang jahat" },
    { time: 228, text: "Ini sumpahku padamu 'tuk biarkanmu" },
    { time: 230, text: "Tumbuh lebih baik, cari panggilanmu" },
    { time: 236, text: "Jadi lebih baik dibanding diriku" },
    { time: 241, text: "'Tuk sementara kita tertawakan berbagai hal" },
    { time: 248, text: "Yang lucu dan lara selepas-lepasnya" },
    { time: 254, text: "Saat dewasa kau 'kan mengerti" },
    { time: 259, text: "Kar'na kelak kau 'kan tersakiti" },
    { time: 264, text: "Saat dewasa kau 'kan mengerti" },
    { time: 269, text: "Kar'na kelak kau 'kan tersakiti" }
    ];

    const TypewriterLyrics = () => {
        const audioRef = useRef(null);
        const [currentLine, setCurrentLine] = useState('');
        const [typedText, setTypedText] = useState('');
        const [typingIndex, setTypingIndex] = useState(0);
        const [currentImage, setCurrentImage] = useState(null);  // Initially no image
        const [imagePosition, setImagePosition] = useState({});  // Random position
        const [isFading, setIsFading] = useState(false); // for fade transition
        const [nextImage, setNextImage] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [startGame, setStartGame] = useState(false);
        const [showButton, setShowButton] = useState(true); // State to control the visibility of the button
    
        // Handle play/pause toggle
        const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
            setShowButton(false);  // Hide the button when audio is playing
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            setShowButton(true);  // Show the button when audio is paused
        }
        };
    
        const handleStart = () => {
        setStartGame(true); // Start the game when the button is clicked
        };
    
        // Click anywhere to show the play/pause button again
        const handleClick = () => {
  setShowButton(true);  // Always show the button when clicking anywhere on the screen
};

    
        // Typewriter effect logic
        useEffect(() => {
        if (currentLine !== '') {
            setTypedText('');
            setTypingIndex(0);
        }
        }, [currentLine]);
    
        useEffect(() => {
        if (typingIndex < currentLine.length) {
            const timeout = setTimeout(() => {
            setTypedText((prev) => prev + currentLine[typingIndex]);
            setTypingIndex((prev) => prev + 1);
            }, 40); // speed of typing
    
            return () => clearTimeout(timeout);
        }
        }, [typingIndex, currentLine]);
    
        useEffect(() => {
        if (startGame) {
            const interval = setInterval(() => {
            if (audioRef.current) {
                const currentTime = audioRef.current.currentTime;
                const current = syncedLyrics
                .slice()
                .reverse()
                .find((line) => currentTime >= line.time);
    
                if (current && current.text !== currentLine) {
                setCurrentLine(current.text);
    
                if (current.image) {
                    setIsFading(true); // Start fade out
    
                    // Prepare next image
                    setNextImage(current.image);
    
                    // After fade out, swap image and fade in
                    setTimeout(() => {
                    setCurrentImage(current.image);
                    setImagePosition(getRandomPosition());
                    setIsFading(false); // Fade in
                    }, 500); // match with fade duration
                } else {
                    setCurrentImage(null);
                    setNextImage(null);
                }
                }
            }
            }, 300);
    
            return () => clearInterval(interval);
        }
        }, [currentLine, startGame]);
    
        // Reset play/pause button visibility when clicking anywhere on the screen
        useEffect(() => {
        if (isPlaying) {
            window.addEventListener('click', handleClick);
    
            return () => {
            window.removeEventListener('click', handleClick);
            };
        }
        }, [isPlaying]);
    
        return (
        <div className="container">
            {!startGame ? (
            <>
                <div
                className="polaroidImage"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-5deg)'}
                >
                <img src="/img/peter.jpg" alt="Power Icon" className="image" />
                <p className="caption">Creator</p>
                </div>
                <button onClick={handleStart} className="startButton">
                Press Me :3
                </button>
            </>
            ) : (
            <div className="lyrics">
                <p>
                {typedText}
                <span style={{ borderRight: '2px solid #eee', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
                </p>
                {currentImage && (
                <div
                    className="polaroidImage"
                    style={{
                    position: 'absolute',
                    ...imagePosition,
                    opacity: isFading ? 0 : 1,
                    pointerEvents: 'none',
                    }}
                >
                    <img src={currentImage} alt="Lyric related" className="polaroidImageContent" />
                </div>
                )}
            </div>
            )}
    
            {startGame && showButton && (
            <button onClick={handlePlayPause} className="playButton">
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            )}
    
            <audio ref={audioRef}>
            <source src="/music/nina.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
            </audio>
        </div>
        );
    };
    
    // Function to generate random positions
    function getRandomPosition() {
        const positions = [
        { top: '10%', left: '10%' },
        { top: '10%', right: '10%' },
        { bottom: '10%', left: '10%' },
        { bottom: '10%', right: '10%' },
        ];
    
        return positions[Math.floor(Math.random() * positions.length)];
    }
    
    export default TypewriterLyrics;