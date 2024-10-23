// app/login.tsx

import { logIn, signUp } from "@/auth/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      alert("Logged in successfully!");
      router.replace("/(tabs)"); // Navigate to the main tabs after successful login
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert("Account created successfully!");
      router.replace("/(tabs)"); // Navigate to the main tabs after successful sign-up
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
