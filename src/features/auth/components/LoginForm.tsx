import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setAccessToken } from "../slice/authSlice";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { setFavoriteLocal } from "../../fovorite/slice/favoriteSlice";
import { useGetAllFavoriteQuery } from "../../fovorite/api/favoriteApi";

const LoginForm = () => {

interface Favorite {
  propertyId: number;
}

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const auth = useAppSelector(
        (state) => state.auth.accessToken
    );

    const {
        data: favorites = [],
    } = useGetAllFavoriteQuery(undefined, {
        skip: !auth,
    });

    useEffect(() => {
        if (auth && favorites?.data) {
            const favoriteIds = favorites?.data?.map(
                (item:Favorite) => item.propertyId
            );

            dispatch(setFavoriteLocal(favoriteIds));

            navigate("/");
        }
    }, [auth, favorites, dispatch, navigate]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();


        setErrorMessage("");

        try {
            const result = await login({
                username: email,
                password: password,
            }).unwrap();

            console.log("Login result:", result);

            dispatch(setAccessToken(result));

        } catch (error) {
            console.error("Login error:", error);

            setErrorMessage(
                "Email və ya şifrə yanlışdır."
            );
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[18px]"
            >
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]"
                    type="text"
                    name="email"
                    placeholder="Email"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]"
                    type="password"
                    name="password"
                    placeholder="Password"
                />

                {errorMessage && (
                    <p className="text-red-500 text-sm">
                        {errorMessage}
                    </p>
                )}

                <input
                    type="submit"
                    value="Login"
                    className="w-[380px] h-[40px] bg-amber-50 rounded-[9px] cursor-pointer"
                />
            </form>
        </div>
    );
};

export default LoginForm;