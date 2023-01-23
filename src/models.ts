import { AlertClasses, AlertColor } from "@mui/material";

export enum Status {
  FINISHED = "Finished",
}

export enum RequestType {
  API_POST_PAYMENT = "POST",
  API_CONFIRM_PAYMENT = "CONFIRM",
  API_PAYMENT_RESULT = "RESULT",
  API_CHECK_STATUS = "STATUS",
}

export interface IPaymentResponse {
  transactionId: string;
  isStarted: boolean;
  status: string;
}

export interface IPaymentCancel {
  secureString: string;
  transactionId: string;
}

export interface IPaymentCreate {
  secureString: string;
  request: PaymentRequest;
}

export interface PaymentRequest {
  amount: number;
  currencyCode: string;
  invoiceNumber: string;
  transactionId: string;
  daughterCompanyId: string;
}

export interface IPaymentConfirm {
  transactionId: string;
  secureString: string;
  confirm: boolean;
}
