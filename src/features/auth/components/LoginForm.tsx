import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setAccessToken } from "../slice/authSlice";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useState } from "react";
import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => (state.auth))


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await login({

            "username": email,
            "password": password

        });
        debugger;
        if ('data' in result) {
            dispatch(setAccessToken(result.data))
            navigate('/');
        }
    }

    console.log(auth);

    return (
        <div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]" type="text" name="email" placeholder="Email" />
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50  bg-amber-50 rounded-[9px]" type="text" name="password" placeholder="Password" />

                <input type="submit" value="Sign Up" className="w-[380px] h-[40px]  bg-amber-50 rounded-[9px]" />
            </form>

        </div>
    )
}

export default LoginForm
