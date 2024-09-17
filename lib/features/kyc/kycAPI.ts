"use server";
import { auth } from "@/auth"
import { Kyc, Ticket } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllKycs = async (type?: string) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}users/?user_type=${type}`, {
      headers,
    });

    const data = await response.json();

    // const data = allData.filter((item: Kyc) => item.user_type === type)

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const readKyc = async (id: number | null) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}user/${id}/`, {
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteKyc = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}user/${id}/`, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();

    if (response.status === 200) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error(data.detail ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiKyc = async (ids: any) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/sales/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ids }),
    });

    const data = await response.json();

    if (!data.error && response.status === 202) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error(data.message ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateKyc = async (kycData: Kyc) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}user/${kycData.id}/`, {
      method: "PUT",
      headers,
      body: JSON.stringify(kycData),
    });

    const data = await response.json();
    if (response.ok) {
      return { message: "Successfully Updated!" };
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const createKyc = async (kycData: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}users/`, {
      method: "POST",
      headers,
      body: JSON.stringify(kycData),
    });
    const data = await response.json();

    if (response.ok) {
      return data
    } else {
      throw new Error(
        data.error || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};