import styled from "styled-components"

const BlackBG = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: #212124;
`;

const MickrTitle = styled.h1`
    z-index: 100;
    position: absolute;
    top: 20rem;
    color: white;
    font-size: 8rem;
    margin: 2rem auto;
    animation: fadeInAnimation ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    padding: 4px 20px;
    margin: 10px;
    /* background-color: rgba(0, 0, 0, .75); */
    border: 1px solid black;
    border-radius: 5px;
    text-shadow: 2px 2px 0px black;

    @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}
`;

const MickSplashImg = styled.img`
    z-index: 50;
    max-height: 80%;
    position: absolute;
    top: 3rem;
    animation: fadeInAnimation2 ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @keyframes fadeInAnimation2 {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}
`;

const MickImg2 = styled.img`
    z-index: 40;
    max-height: 60%;
    position: absolute;
    top: 6rem;
    left: 3rem;
    animation: fadeInAnimation2 ease 4s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @keyframes fadeInAnimation2 {
    0% {
        opacity: 0;
    }
    55% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}
`;

const MickImg3 = styled.img`
    z-index: 40;
    max-height: 60%;
    position: absolute;
    top: 12rem;
    right: 3rem;
    animation: fadeInAnimation2 ease 4.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @keyframes fadeInAnimation2 {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}
`;

export default function SplashPage() {


    return (
        <BlackBG>
            <MickSplashImg src="https://media.spokesman.com/photos/2016/12/08/Music_Rolling_Stones.JPG.jpg"></MickSplashImg>
            <MickImg2 src="https://media.gq-magazine.co.uk/photos/5d139002d7a701c579bba08d/master/w_1920,c_limit/Mick-Jagger-02-GQ-24July17_rex_b.jpg"></MickImg2>
            <MickImg3 src="https://assets.considerable.com/wp-content/uploads/2019/08/09140218/stones-3.jpg"></MickImg3>
            <MickrTitle>Mickr</MickrTitle>
        </BlackBG>
    )
}
