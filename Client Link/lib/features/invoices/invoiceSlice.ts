import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllInvoices } from "./invoiceAPI";
import { Invoice } from "@/types/types";

export interface InvoiceSliceState {
    invoices: Invoice[];
    status: "idle" | "loading" | "failed";
    error: null | string;
    invoice: null | Invoice;
}

const initialState: InvoiceSliceState = {
    invoices: [],
    status: "idle",
    error: null,
    invoice: null
};

export const invoiceSlice = createAppSlice({
    name: 'invoice',
    initialState,
    reducers: (create) => ({
        updateInvoiceState: create.reducer((state, action: PayloadAction<Invoice | null>) => {
            state.status = 'idle';
            state.invoice = action.payload;
        }),
        updateInvoices: create.reducer((state, action: PayloadAction<Invoice[]>) => {
            state.status = 'idle';
            state.invoices = action.payload;
        }),
        fetchAllInvoicesAsync: create.asyncThunk(
            async () => {
                try {
                    const response = await getAllInvoices();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response;
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }

            },
            {
                pending: (state) => { state.status = "loading"; },
                fulfilled: (state, action) => { state.status = "idle"; state.invoices = action.payload; },
                rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
            },
        ),
    }),
    selectors: {
        selectInvoice: (invoice) => invoice.invoice,
        selectInvoiceStates: (invoice) => invoice
    }
});

export const { fetchAllInvoicesAsync, updateInvoiceState, updateInvoices } = invoiceSlice.actions;

export const { selectInvoice, selectInvoiceStates } = invoiceSlice.selectors