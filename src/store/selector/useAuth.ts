import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  login,
  logout,
  SignInData,
  SignUpData,
  needVerify,
  setError,
  setLoading,
  setSuccess,
  setAuthForm,
} from "../reducer/authReducer";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const AuthState = useAppSelector((state) => state.auth);

  const signup = async (data: SignUpData, onError: () => void) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res.user) {
        const userData: any = {
          email: res.user.email,
          username: res.user.email?.slice(0, res.user.email.indexOf("@")),
          password: data.password,
          uid: res.user.uid,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
          role: data.role,
          activeStatus: data.activeStatus,
        };
        await axios.post(
          `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/users.json`,
          userData
        );
        dispatch(needVerify());
        if (!AuthState.needVerification) {
          await sendEmailVerification(res!.user);
        }

        return dispatch(login(userData));
      }
    } catch (err: any) {
      onError();
      dispatch(setError(err?.message));
    }
  };

  const setLoadingIn = (value: boolean) => {
    return dispatch(() => {
      setLoading(value);
    });
  };

  const signin = async (data: SignInData, onError: () => void) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return dispatch(login(res.user));
    } catch (err: any) {
      onError();
      dispatch(setError(err.message));
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      dispatch(setLoading(true));
      return dispatch(logout());
    } catch (err: any) {
      dispatch(setLoading(false));
    }
  };

  const setErrorIn = (msg: string) => {
    return dispatch(() => {
      setError(msg);
    });
  };

  const setAuthIn = React.useCallback(
    () => dispatch(setAuthForm()),
    [dispatch]
  );

  const setNeedVerification = () => {
    return dispatch(() => {
      needVerify();
    });
  };

  const setSuccessMsg = (msg: string) => {
    return dispatch(() => {
      setSuccess(msg);
    });
  };

  const forgotPassword = async (email: string, successMsg: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `http://localhost:3000/dang-nhap`,
      });
      dispatch(setSuccess(successMsg));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  const resetPassword = async (oobCode: string, newPassword: string) => {
    if (!oobCode && !newPassword) return;

    return await confirmPasswordReset(auth, oobCode, newPassword);
  };

  return {
    AuthState,
    forgotPassword,
    resetPassword,
    setNeedVerification,
    setSuccessMsg,
    sendEmailVerification,
    signout,
    signin,
    signup,
    setErrorIn,
    setLoadingIn,
    setAuthIn,
  };
};

export default useAuth;
