import { createAppSlice } from "@/lib/createAppSlice";
import { getAllKycs } from "./kycAPI";
import { Kyc } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface KycSliceState {
    kycs: Kyc[];
    kyc: Kyc | null | undefined
    status: "idle" | "loading" | "failed";
    error: null | string;
    value: string;
}

const initialState: KycSliceState = {
    kycs: [],
    status: "idle",
    error: null,
    kyc: null,
    value: 'list'
};

export const kycSlice = createAppSlice({
    name: 'kyc',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        updateKycs: reducer((state, action: PayloadAction<Kyc[]>) => {
            state.status = 'idle';
            state.kycs = action.payload;
        }),
        setValue: reducer((state, { payload }: PayloadAction<string>) => {
            state.status = 'idle';
            state.value = payload;
        }),
        updateKycState: reducer((state, action: PayloadAction<Kyc | null | undefined>) => {
            state.status = 'idle';
            state.kyc = action.payload;
        }),
        fetchAllKycAsync: asyncThunk(
            async (params: { type?: string }) => {
                try {
                    const response = await getAllKycs(params.type);
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.results;
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            },
            {
                pending: (state) => { state.status = "loading"; },
                fulfilled: (state, action) => { state.status = "idle"; state.kycs = action.payload; },
                rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
            },
        ),
    }),
    selectors: {
        selectKycs: (kyc) => kyc.kycs,
        selectKyc: (kyc) => kyc.kyc,
        selectValue: (kyc) => kyc.value,
        selectKycState: (kyc) => kyc
    }
});

export const { fetchAllKycAsync, updateKycs, updateKycState, setValue } = kycSlice.actions;

export const { selectValue, selectKycs, selectKycState, selectKyc } = kycSlice.selectors