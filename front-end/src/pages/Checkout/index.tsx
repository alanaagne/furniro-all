'use client';

import React, { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCartStore } from "@store/useCartStore";
import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@components/FeaturesSection";

interface FormDataState {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  city: string;
  province: string;
  zip: string;
  phone: string;
  email: string;
  notes: string;
}

interface PaymentOption {
  id: string;
  label: string;
  desc: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<string>("bank_transfer_1");
  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    company: "",
    country: "Brasil",
    street: "",
    city: "",
    province: "",
    zip: "",
    phone: "",
    email: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    const cleanCep = formData.zip.replace(/\D/g, "");

    if (cleanCep.length === 8) {
      try {
        setLoadingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          toast.error("CEP não encontrado. Verifique o número digitado.", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              fontFamily: "Poppins, sans-serif"
            }
          });
          return;
        }

        setFormData((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          city: data.localidade || prev.city,
          province: data.uf || prev.province,
          country: "Brasil",
        }));

        toast.success("Endereço preenchido automaticamente!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontFamily: "Poppins, sans-serif"
          },
          iconTheme: {
            primary: "#B88E2F",
            secondary: "#fff"
          }
        });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar dados do CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      toast.error("Por favor, selecione um método de pagamento.");
      return;
    }

    toast.success("Order placed successfully!", {
      duration: 4000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        fontSize: "15px"
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
      desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
    },
    {
      id: "bank_transfer_2",
      label: "Direct Bank Transfer",
      desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
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
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "26px", flexWrap: "wrap", justifyContent: "space-between" }}>
          
          <div style={{ flex: "1 1 500px", maxWidth: "608px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 600, marginBottom: "36px", color: "#000000" }}>
              Billing details
            </h2>
            
            <div style={{ display: "flex", gap: "31px", marginBottom: "36px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="firstName" style={labelStyle}>First Name</label>
                <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="company" style={labelStyle}>Company Name (Optional)</label>
              <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="zip" style={labelStyle}>
                ZIP code {loadingCep && <span style={{ fontSize: "12px", color: "#B88E2F" }}>(Buscando...)</span>}
              </label>
              <input 
                id="zip" 
                name="zip" 
                type="text" 
                maxLength={9}
                placeholder="00000-000"
                required 
                value={formData.zip} 
                onChange={handleInputChange} 
                onBlur={handleCepBlur}
                style={inputStyle} 
              />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="country" style={labelStyle}>Country / Region</label>
              <select id="country" name="country" value={formData.country} onChange={handleInputChange} style={{ ...inputStyle, backgroundColor: "#fff" }}>
                <option value="Brasil">Brasil</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="street" style={labelStyle}>Street address</label>
              <input id="street" name="street" type="text" required value={formData.street} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="city" style={labelStyle}>Town / City</label>
              <input id="city" name="city" type="text" required value={formData.city} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="province" style={labelStyle}>Province / State</label>
              <input id="province" name="province" type="text" required value={formData.province} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="phone" style={labelStyle}>Phone</label>
              <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label htmlFor="email" style={labelStyle}>Email address</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div>
              <input id="notes" name="notes" type="text" placeholder="Additional information" value={formData.notes} onChange={handleInputChange} style={{ ...inputStyle, marginTop: "30px" }} />
            </div>
          </div>

          <div style={{ width: "100%", maxWidth: "608px", padding: "87px 37px" }}>
            <div style={{ width: "100%", maxWidth: "533px", margin: "0 auto" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "24px", fontWeight: 500, color: "#000000" }}>Product</span>
                <span style={{ fontSize: "24px", fontWeight: 500, color: "#000000" }}>Subtotal</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#9F9F9F" }}>
                  Asgaard sofa <span style={{ color: "#000000", fontWeight: 500, fontSize: "12px" }}>X 1</span>
                </span>
                <span style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>Rs. 250,000.00</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#000000" }}>Subtotal</span>
                <span style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>Rs. 250,000.00</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "34px" }}>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#000000" }}>Total</span>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "#B88E2F" }}>Rs. 250,000.00</span>
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
                  disabled={!selectedPayment}
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
  marginBottom: "22px",
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

const descriptionStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 300,
  color: "#9F9F9F",
  lineHeight: "100%",
  textAlign: "justify",
  maxWidth: "528px",
  marginTop: "11px",
};