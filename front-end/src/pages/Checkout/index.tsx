'use client';

import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useCartStore } from "@store/useCartStore";
import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@components/FeaturesSection";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name must have at least 2 characters"),
  company: z.string().optional(),
  zip: z.string().min(8, "ZIP code must be at least 8 digits"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "State / Province is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface PaymentOption {
  id: string;
  label: string;
  desc: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [selectedPayment, setSelectedPayment] = useState<string>("bank_transfer_1");
  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "Brasil",
      company: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      navigate("/shop");
    }
  }, [items, navigate]);

  const parsePrice = (priceStr: string | number): number => {
    if (typeof priceStr === "number") return priceStr;
    const cleanStr = priceStr.replace(/[^\d.,]/g, "").replace(",", ".");
    return parseFloat(cleanStr) || 0;
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  };

  const totalAmount = calculateSubtotal();

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cleanCep = e.target.value.replace(/\D/g, "");

    if (cleanCep.length === 8) {
      try {
        setLoadingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          toast.error("CEP não encontrado.");
          return;
        }

        setValue("street", data.logradouro || "", { shouldValidate: true });
        setValue("city", data.localidade || "", { shouldValidate: true });
        setValue("province", data.uf || "", { shouldValidate: true });
        setValue("country", "Brasil", { shouldValidate: true });

        toast.success("Endereço preenchido!");
      } catch (error) {
        console.error("Erro no CEP:", error);
        toast.error("Erro ao buscar o CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Dados do formulário:", data);
    if (!selectedPayment) {
      toast.error("Selecione um método de pagamento.");
      return;
    }

    toast.success("Pedido realizado com sucesso!", {
      duration: 3000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontFamily: "Poppins, sans-serif"
      },
      iconTheme: {
        primary: "#B88E2F",
        secondary: "#fff",
      },
    });

    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const paymentOptions: PaymentOption[] = [
    {
      id: "bank_transfer_1",
      label: "Direct Bank Transfer",
      desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference."
    },
    {
      id: "bank_transfer_2",
      label: "Direct Bank Transfer (Option 2)",
      desc: "Make your payment directly into our alternative bank account."
    },
    {
      id: "cash_on_delivery",
      label: "Cash On Delivery",
      desc: "Pay with cash upon delivery of your items right to your doorstep."
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Banner title="Checkout" />

      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "63px 20px" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "26px", flexWrap: "wrap", justifyContent: "space-between" }}>

          <div style={{ flex: "1 1 500px", maxWidth: "608px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 600, marginBottom: "36px", color: "#000000" }}>
              Billing details
            </h2>

            <div style={{ display: "flex", gap: "31px", marginBottom: "36px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="firstName" style={labelStyle}>First Name</label>
                <input id="firstName" type="text" {...register("firstName")} style={inputStyle} />
                {errors.firstName && <span style={errorStyle}>{errors.firstName.message}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                <input id="lastName" type="text" {...register("lastName")} style={inputStyle} />
                {errors.lastName && <span style={errorStyle}>{errors.lastName.message}</span>}
              </div>
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="company" style={labelStyle}>Company Name (Optional)</label>
              <input id="company" type="text" {...register("company")} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="zip" style={labelStyle}>
                ZIP code {loadingCep && <span style={{ fontSize: "12px", color: "#B88E2F" }}>(Buscando...)</span>}
              </label>
              <input
                id="zip"
                type="text"
                maxLength={9}
                placeholder="00000-000"
                {...register("zip", { onBlur: handleCepBlur })}
                style={inputStyle}
              />
              {errors.zip && <span style={errorStyle}>{errors.zip.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="country" style={labelStyle}>Country / Region</label>
              <select id="country" {...register("country")} style={{ ...inputStyle, backgroundColor: "#fff" }}>
                <option value="Brasil">Brasil</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
              {errors.country && <span style={errorStyle}>{errors.country.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="street" style={labelStyle}>Street address</label>
              <input id="street" type="text" {...register("street")} style={inputStyle} />
              {errors.street && <span style={errorStyle}>{errors.street.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="city" style={labelStyle}>Town / City</label>
              <input id="city" type="text" {...register("city")} style={inputStyle} />
              {errors.city && <span style={errorStyle}>{errors.city.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="province" style={labelStyle}>Province / State</label>
              <input id="province" type="text" {...register("province")} style={inputStyle} />
              {errors.province && <span style={errorStyle}>{errors.province.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="phone" style={labelStyle}>Phone</label>
              <input id="phone" type="tel" {...register("phone")} style={inputStyle} />
              {errors.phone && <span style={errorStyle}>{errors.phone.message}</span>}
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="email" style={labelStyle}>Email address</label>
              <input id="email" type="email" {...register("email")} style={inputStyle} />
              {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
            </div>

            <div>
              <input id="notes" type="text" placeholder="Additional information" {...register("notes")} style={{ ...inputStyle, marginTop: "30px" }} />
            </div>
          </div>

          <div style={{ width: "100%", maxWidth: "608px", padding: "87px 37px" }}>
            <div style={{ width: "100%", maxWidth: "533px", margin: "0 auto" }}>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "24px", fontWeight: 500, color: "#000000" }}>Product</span>
                <span style={{ fontSize: "24px", fontWeight: 500, color: "#000000" }}>Subtotal</span>
              </div>

              <div style={{ marginBottom: "22px", maxHeight: "240px", overflowY: "auto" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 400, color: "#9F9F9F" }}>
                      {item.name} <span style={{ color: "#000000", fontWeight: 500, fontSize: "12px" }}>X {item.quantity}</span>
                    </span>
                    <span style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>
                      Rs. {(parsePrice(item.price) * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#000000" }}>Subtotal</span>
                <span style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>
                  Rs. {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "34px" }}>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#000000" }}>Total</span>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "#B88E2F" }}>
                  Rs. {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #D9D9D9", marginBottom: "22px" }} />

              <div role="radiogroup" aria-label="Payment Methods" style={{ display: "flex", flexDirection: "column", gap: "11px", marginBottom: "25px" }}>
                {paymentOptions.map((item) => {
                  const isSelected = selectedPayment === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedPayment(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <CustomRadio selected={isSelected} />
                        <span style={{ fontSize: "16px", fontWeight: 500, color: isSelected ? "#000000" : "#9F9F9F" }}>
                          {item.label}
                        </span>
                      </button>
                      {isSelected && <p style={descriptionStyle}>{item.desc}</p>}
                    </div>
                  );
                })}
              </div>

              <p style={{ fontSize: "16px", fontWeight: 300, color: "#000000", lineHeight: "100%", textAlign: "justify", maxWidth: "529px", marginBottom: "39px" }}>
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span style={{ fontWeight: 600 }}>privacy policy.</span>
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  disabled={!selectedPayment || items.length === 0}
                  style={{
                    width: "318px",
                    height: "64px",
                    borderRadius: "15px",
                    border: "1px solid #000000",
                    backgroundColor: "transparent",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#000000",
                    cursor: selectedPayment ? "pointer" : "not-allowed",
                    opacity: selectedPayment ? 1 : 0.4,
                    transition: "all 0.3s ease",
                  }}
                >
                  Place order
                </button>
              </div>

            </div>
          </div>

        </form>
      </main>

      <FeaturesSection />
    </div>
  );
}

interface CustomRadioProps {
  selected: boolean;
}

function CustomRadio({ selected }: CustomRadioProps) {
  return (
    <span
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        backgroundColor: selected ? "#000000" : "transparent",
        border: selected ? "none" : "1px solid #9F9F9F",
        boxSizing: "border-box",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "12px",
  color: "#000000"
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: "75px",
  borderRadius: "10px",
  border: "1px solid #9F9F9F",
  padding: "0 20px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const errorStyle: CSSProperties = {
  color: "#d9534f",
  fontSize: "13px",
  marginTop: "6px",
  display: "block",
};

const descriptionStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 300,
  color: "#9F9F9F",
  lineHeight: "100%",
  textAlign: "justify",
  maxWidth: "528px",
  marginTop: "11px",
};