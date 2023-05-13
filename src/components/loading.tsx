import { FC } from "react"
import ReactLoading from "react-loading";


const Loading : FC = () => {
    return (
        <div className="loading">
            <ReactLoading type={'spinningBubbles'} color={'#fff'} height={'100px'} width={'100px'} />
        </div>
    );
};

export default Loading;