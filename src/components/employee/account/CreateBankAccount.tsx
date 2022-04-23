import { useState } from "react";
import React, { FC } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

interface RegisterProps {}
export const CreateBankAccount: FC<RegisterProps> = () => {
  const axiosPrivate = useAxiosPrivate();
  const [number, setNumber] = useState<string>("");
  const [balance, setBalance] = useState<number>();
  const [transferLimit, setTransferLimit] = useState<number>();
  const [isActive, setisActive] = useState<boolean>(true);
  const [accountTypeId, setAccountTypeId] = useState<number>();
  const [currencyId, setCurrencyId] = useState<number>();
  const [customerId, setCustomerId] = useState<string>("");

  const REGISTER_URL = "/api/Customer/create";
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!number) {
      alert("Number field empty");
      return;
    }
    if (!balance) {
      alert("Balance field empty");
      return;
    }
    if (!transferLimit) {
      alert("Transfer limit field empty");
      return;
    }
    if (!accountTypeId) {
      alert("Account type id name field empty");
      return;
    }
    if (!currencyId) {
      alert("Currency id field empty");
      return;
    }
    if (!customerId) {
      alert("Customer id field empty");
      return;
    }

    const bankAccountProps = {
      number: number,
      balance: balance,
      transferLimit: transferLimit,
      isActive: isActive,
      accountTypeId: accountTypeId,
      currencyId: currencyId,
      customerId: customerId,
    };
    axiosPrivate.post(REGISTER_URL, bankAccountProps).then((response) => {
      console.log(response);
    });

    setNumber("");
    setBalance(0);
    setTransferLimit(0);
    setAccountTypeId(0);
    setCurrencyId(0);
    setCustomerId("");
  };

  return (
    <div className="flex h-screen w-full">
      <form
        onSubmit={onSubmit}
        className="m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 "
      >
        <label className="form-label-input" htmlFor="number">
          <input
            className="form-input"
            id="number"
            value={number}
            type="text"
            placeholder="number"
            onChange={(e) => setNumber(e.target.value)}
            onBlur={(e) => setNumber(e.target.value)}
          />
        </label>
        <label className="form-label-input" htmlFor="balance">
          <input
            className="form-input"
            id="balance"
            value={balance}
            type="number"
            placeholder="balance"
            onChange={(e) => setBalance(+e.target.value)}
            onBlur={(e) => setBalance(+e.target.value)}
          />
        </label>
        <label className="form-label-input" htmlFor="transferLimit">
          <input
            className="form-input"
            id="transferLimit"
            value={transferLimit}
            type="number"
            placeholder="transferLimit"
            onChange={(e) => setTransferLimit(+e.target.value)}
            onBlur={(e) => setTransferLimit(+e.target.value)}
          />
        </label>
        <label className="form-label-input" htmlFor="accountTypeId">
          <input
            className="form-input"
            id="accountTypeId"
            value={accountTypeId}
            type="number"
            placeholder="Last name"
            onChange={(e) => setAccountTypeId(+e.target.value)}
            onBlur={(e) => setAccountTypeId(+e.target.value)}
          />
        </label>
        <label className="form-label-input" htmlFor="currencyId">
          <input
            className="form-input"
            id="currencyId"
            value={currencyId}
            type="number"
            placeholder="National Id"
            onChange={(e) => setCurrencyId(+e.target.value)}
            onBlur={(e) => setCurrencyId(+e.target.value)}
          />
        </label>
        <label className="form-label-input" htmlFor="customerId">
          <input
            className="form-input"
            id="customerId"
            value={customerId}
            type="date"
            onChange={(e) => setCustomerId(e.target.value)}
            onBlur={(e) => setCustomerId(e.target.value)}
          />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};
