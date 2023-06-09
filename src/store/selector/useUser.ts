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
} from "../reducer/userReducer";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase";

const useUser = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

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
          displayName: res.user.displayName ?? res.user.email?.slice(0, 8),
          uid: res.user.uid,
          createdAt: serverTimestamp(),
        };
        dispatch(needVerify());
        if (!userState.needVerification) {
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
    userState,
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

export default useUser;
