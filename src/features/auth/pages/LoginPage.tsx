

const LoginPage = () => {
    return (
        <div>

            <div className="w-[100%] h-[500px] flex items-center justify-center  bg-cover
    bg-center h-screen
    bg-no-repeat bg-[url('data:image/jpeg;base64,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')]">

                <div className="flex flex-col w-[35%] h-[350px] bg-amber-100 rounded-3xl flex items-center justify-center">
                    <div className="w-[100%] h-[300px] flex flex-col justify-center items-center">
                        <form action="" className="flex flex-col gap-[18px]">
                            <input className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50 rounded-[9px]" type="text" name="email" placeholder="Email" />
                            <input className="w-[380px] h-[40px] p-[10px] focus:outline-none border-1 bg-amber-50  bg-amber-50 rounded-[9px]" type="text" name="password" placeholder="Password" />

                            <input type="submit" value="Sign Up" className="w-[380px] h-[40px]  bg-amber-50 rounded-[9px]" />
                        </form>
                    </div>
                <div className="w-[90%] flex  justify-between">
<p>Forgot your password?</p>
<p>Register</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
