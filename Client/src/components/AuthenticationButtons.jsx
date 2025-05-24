import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AuthContext from "@/auth/AuthContext";
export const AuthenticationButtons = () => {
    const { login, user, logout, register } = useContext(AuthContext);
    const [option, setOption] = useState("sign in");
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatchError, setPasswordMatchError] = useState("");
    const handleOpen = (selectedOption) => {
        setOption(selectedOption);
        setOpen(true);
        clearFormData();
    };

    async function signInOnSubmit(e) {
        e.preventDefault();
        const response = await login(email, password);
        //Closes the form and clear the data , when request is successful
        if (response) {
            setOpen(false);
            clearFormData();
        }
    }

    async function signUpOnSubmit(e) {
        e.preventDefault();

        const response = await register(email, password);
        setOpen(false);
        clearFormData();
    }

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
        if (confirmPassword == e.target.value) {
            setPasswordMatchError("");
        } else {
            setPasswordMatchError("Passwords doesn't match");
        }
    }

    async function onConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);

        if (password === e.target.value) {
            setPasswordMatchError("");
        } else {
            setPasswordMatchError("Passwords doesn't match");
        }
    }

    function clearFormData() {
        setConfirmPassword("");
        setEmail("");
        setPassword("");
    }

    //add on switch between modes to clear the form states
    return (
        <>
            <div className="flex gap-4">
                {!user ? (
                    <>
                        <Button
                            onClick={() => handleOpen("sign in")}
                            className="bg-[#4199FF] drop-shadow-xl mx-2 hover:bg-[#357dd0]"
                        >
                            Sign in
                        </Button>
                        <Button
                            onClick={() => handleOpen("sign up")}
                            className="bg-[#4199FF] drop-shadow-xl me-5 hover:bg-[#357dd0]"
                        >
                            Sign up
                        </Button>
                    </>
                ) : (
                    <div>
                        <Button
                            onClick={() => logout()}
                            className="bg-[#4199FF] drop-shadow-xl me-5 hover:bg-[#357dd0]"
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Tabs defaultValue={option} onValueChange={clearFormData}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sign in">Sign in</TabsTrigger>
                            <TabsTrigger value="sign up">Sign up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sign in">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign in</CardTitle>
                                    <CardDescription>
                                        Sign in to have your say and see what
                                        others think.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <form onSubmit={(e) => signInOnSubmit(e)}>
                                        <div className="space-y-2">
                                            <Label htmlFor="email-signin">
                                                Email
                                            </Label>
                                            <Input
                                                onChange={onEmailChange}
                                                type="email"
                                                className="my-2"
                                                value={email}
                                                placeholder="example@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password-signin">
                                                Password
                                            </Label>
                                            <Input
                                                value={password}
                                                onChange={onPasswordChange}
                                                type="password"
                                                className="my-2"
                                                placeholder="Your password"
                                            />
                                        </div>
                                        <Button className="mt-3">
                                            Sign in
                                        </Button>
                                    </form>
                                </CardContent>
                                <CardFooter>{}</CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="sign up">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign up</CardTitle>
                                    <CardDescription>
                                        Create an account to cast your votes,
                                        share your voice, and be part of the
                                        community.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <form onSubmit={signUpOnSubmit}>
                                        <div className="space-y-2">
                                            <Label htmlFor="email-signup">
                                                Email
                                            </Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                className="my-2"
                                                onChange={onEmailChange}
                                                placeholder="example@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password-signup">
                                                Password
                                            </Label>
                                            <Input
                                                type="password"
                                                className="my-2"
                                                value={password}
                                                onChange={onPasswordChange}
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmpassword-signup">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                type="password"
                                                className="my-2"
                                                value={confirmPassword}
                                                onChange={
                                                    onConfirmPasswordChange
                                                }
                                                placeholder="Confirm Password"
                                            />
                                            <Label className="text-red-500">
                                                {passwordsMatchError}
                                            </Label>
                                        </div>
                                        <Button
                                            className="mt-3"
                                            disabled={!!passwordsMatchError}
                                        >
                                            Sign up
                                        </Button>
                                    </form>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
};
