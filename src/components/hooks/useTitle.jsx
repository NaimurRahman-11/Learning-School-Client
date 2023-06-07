import { useEffect } from "react";


const useTitle = title => {

    useEffect(() => {
        document.title = `${title} - Learning School`;
    }, [title])
};

export default useTitle;