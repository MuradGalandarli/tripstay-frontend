import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setAccessToken } from "../slice/authSlice";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useState } from "react";
import { useRegisterMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import type { RegisterDto } from "../types/RegisterRequest"

const RegisterForm = () => {

    const [newUser, setNewUser] = useState<RegisterDto>({
        "userName": "",
        "email": "",
        "password": ""
    });

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => (state.auth))


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
debugger
console.log(newUser)
        const result = await register(newUser);
        
        if ('data' in result) {
            dispatch(setAccessToken(result.data))
            navigate('/');
        }
    }

    console.log(auth);

    return (
        <div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                <input value={newUser.userName} onChange={(e) => { setNewUser(prev => ({ ...prev, userName  : e.target.value })) }} className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]" type="text" name="username" placeholder="Name" />
                <input value={newUser.email} onChange={(e) => { setNewUser(prev =>({...prev,email:e.target.value})) }} className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]" type="text" name="email" placeholder="Email" />
                <input value={newUser.password} onChange={(e) => { setNewUser(prev =>({...prev,password :e.target.value})) }} className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50  bg-amber-50 rounded-[9px]" type="text" name="password" placeholder="Password" />

                <input type="submit" value="Sign Up" className="w-[380px] h-[40px]  bg-amber-50 rounded-[9px]" />
            </form>

        </div>
    )
}

export default RegisterForm
