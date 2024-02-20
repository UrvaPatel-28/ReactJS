
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '../../Fetures/countSlice';

const Count = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        console.log(state.count);
        return state.count
    }
    )

    const add = () => {
        dispatch(increment(10))
    }
    const minus = () => {
        dispatch(decrement())
    }

    return (
        <>
            <div>

                <h1>  {data}</h1>
                <button onClick={add}>Incriment</button>
                <button onClick={minus}>Decrement</button>
            </div>

        </>
    )
}

export default Count;