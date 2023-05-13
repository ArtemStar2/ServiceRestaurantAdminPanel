import {FC, useContext, useState} from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

const loginForm: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context)

    return (
        <div className='form'>
            <div className='form__box'>
                <input
                    name={'login'}
                    className='input__style'
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                    type="text"
                    placeholder={'Login'}
                />
                <input
                    name={'password'}
                    className='input__style'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="text"
                    placeholder={'Password'}
                />
                <button className='button__form' onClick={() => store.auth(login, password)}>Авторизоваться</button>
            </div>
        </div>
    );
};

export default observer(loginForm);