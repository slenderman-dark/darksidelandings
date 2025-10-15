"use client";

import Header from "@/components/MainComponent/Header";
import { useState } from "react";
import { supabase, FormSubmission } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    cpf: "",
    endereco: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    celular: "",
    turma: "",
    autorizaEmails: false
  });

  const [errors, setErrors] = useState({
    nomeCompleto: "",
    email: "",
    cpf: "",
    endereco: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    celular: "",
    turma: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para validar CPF
  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  // Função para validar email
  const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar telefone
  const validarTelefone = (telefone: string): boolean => {
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return telefoneRegex.test(telefone);
  };

  // Função para formatar CPF
  const formatarCPF = (cpf: string): string => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar CEP
  const formatarCEP = (cep: string): string => {
    cep = cep.replace(/[^\d]/g, '');
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  // Função para validar CEP
  const validarCEP = (cep: string): boolean => {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  };

  // Função para formatar telefone
  const formatarTelefone = (telefone: string): string => {
    telefone = telefone.replace(/[^\d]/g, '');
    if (telefone.length <= 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  // Função para validar um campo específico
  const validarCampo = (name: string, value: string): string => {
    switch (name) {
      case 'nomeCompleto':
        if (!value.trim()) return 'Nome completo é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Nome deve conter apenas letras';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        if (!validarEmail(value)) return 'Email inválido';
        return '';
      
      case 'cpf':
        if (!value.trim()) return 'CPF é obrigatório';
        if (!validarCPF(value)) return 'CPF inválido';
        return '';
      
      case 'endereco':
        if (!value.trim()) return 'Endereço é obrigatório';
        if (value.trim().length < 5) return 'Endereço deve ter pelo menos 5 caracteres';
        return '';
      
      case 'bairro':
        if (!value.trim()) return 'Bairro é obrigatório';
        if (value.trim().length < 2) return 'Bairro deve ter pelo menos 2 caracteres';
        return '';
      
      case 'cep':
        if (!value.trim()) return 'CEP é obrigatório';
        if (!validarCEP(value)) return 'CEP inválido. Use o formato 00000-000';
        return '';
      
      case 'cidade':
        if (!value.trim()) return 'Cidade é obrigatória';
        if (value.trim().length < 2) return 'Cidade deve ter pelo menos 2 caracteres';
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Cidade deve conter apenas letras';
        return '';
      
      case 'estado':
        if (!value.trim()) return 'Estado é obrigatório';
        return '';
      
      case 'celular':
        if (!value.trim()) return 'Celular é obrigatório';
        if (!validarTelefone(value)) return 'Celular inválido. Use o formato (XX) XXXXX-XXXX';
        return '';
      
      case 'turma':
        if (!value.trim()) return 'Turma é obrigatória';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue = value;

    // Formatação automática para CPF e telefone
    if (name === 'cpf') {
      newValue = formatarCPF(value);
    } else if (name === 'celular') {
      newValue = formatarTelefone(value);
    } else if (name === 'cep') {
      newValue = formatarCEP(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : newValue
    }));

    // Validação em tempo real
    if (name !== 'autorizaEmails') {
      const error = validarCampo(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    const newErrors = {
      nomeCompleto: validarCampo('nomeCompleto', formData.nomeCompleto),
      email: validarCampo('email', formData.email),
      cpf: validarCampo('cpf', formData.cpf),
      endereco: validarCampo('endereco', formData.endereco),
      bairro: validarCampo('bairro', formData.bairro),
      cep: validarCampo('cep', formData.cep),
      cidade: validarCampo('cidade', formData.cidade),
      estado: validarCampo('estado', formData.estado),
      celular: validarCampo('celular', formData.celular),
      turma: validarCampo('turma', formData.turma)
    };

    setErrors(newErrors);

    // Verificar se há erros
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      setIsSubmitting(true);
      
      try {
        // Verificar se CPF já existe
        const { data: cpfExists } = await supabase
          .from('form_submissions')
          .select('id')
          .eq('cpf', formData.cpf)
          .limit(1);

        if (cpfExists && cpfExists.length > 0) {
          setErrors(prev => ({
            ...prev,
            cpf: 'Este CPF já está cadastrado no sorteio'
          }));
          setIsSubmitting(false);
          alert('Este CPF já está cadastrado no sorteio. Cada pessoa pode participar apenas uma vez.');
          return;
        }

        // Verificar se email já existe
        const { data: emailExists } = await supabase
          .from('form_submissions')
          .select('id')
          .eq('email', formData.email.toLowerCase())
          .limit(1);

        if (emailExists && emailExists.length > 0) {
          setErrors(prev => ({
            ...prev,
            email: 'Este email já está cadastrado no sorteio'
          }));
          setIsSubmitting(false);
          alert('Este email já está cadastrado no sorteio. Cada pessoa pode participar apenas uma vez.');
          return;
        }

        // Preparar dados para o Supabase
        const submissionData: Omit<FormSubmission, 'id' | 'created_at'> = {
          nome_completo: formData.nomeCompleto,
          email: formData.email.toLowerCase(), // Salvar email em minúsculas
          cpf: formData.cpf,
          endereco: formData.endereco,
          bairro: formData.bairro,
          cep: formData.cep,
          cidade: formData.cidade,
          estado: formData.estado,
          celular: formData.celular,
          turma: formData.turma,
          autoriza_emails: formData.autorizaEmails
        };

        // Inserir dados no Supabase
        const { data, error } = await supabase
          .from('form_submissions')
          .insert([submissionData])
          .select();

        if (error) {
          console.error('Erro ao salvar dados:', error);
          alert('Erro ao enviar formulário. Tente novamente.');
        } else {
          console.log('Dados salvos com sucesso:', data);
          alert('Formulário enviado com sucesso! Você está participando do sorteio.');
          
          // Limpar formulário após sucesso
          setFormData({
            nomeCompleto: "",
            email: "",
            cpf: "",
            endereco: "",
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
            celular: "",
            turma: "",
            autorizaEmails: false
          });
          
          // Limpar erros
          setErrors({
            nomeCompleto: "",
            email: "",
            cpf: "",
            endereco: "",
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
            celular: "",
            turma: ""
          });
        }
      } catch (error) {
        console.error('Erro inesperado:', error);
        alert('Erro inesperado. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Por favor, corrija os erros no formulário antes de enviar.");
    }
  };

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#171717] shadow-xl rounded-lg p-8">
             {/* Logo centralizado */}
             <div className="flex justify-center mb-8">
               <Image
                 src="/logo-dark.png"
                 alt="Dark Central Logo"
                 width={200}
                 height={64}
                 className="object-contain"
               />
             </div>
             
             <h2 className="text-3xl font-bold text-white text-center mb-8">
               Formulário de Participação - Sorteio Clip
             </h2>
             
             <form onSubmit={handleSubmit} className="space-y-6">
               {/* Nome Completo */}
               <div>
                 <label htmlFor="nomeCompleto" className="block text-sm font-medium text-white mb-2">
                   Nome Completo *
                 </label>
                 <input
                   type="text"
                   id="nomeCompleto"
                   name="nomeCompleto"
                   value={formData.nomeCompleto}
                   onChange={handleInputChange}
                   required
                   className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.nomeCompleto ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.nomeCompleto ? 'border-red-500' : 'border-gray-600'}`}
                   placeholder="Digite seu nome completo"
                 />
                 {errors.nomeCompleto && (
                   <p className="mt-1 text-sm text-red-500">{errors.nomeCompleto}</p>
                 )}
               </div>

               {/* E-mail */}
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                   E-mail *
                 </label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   required
                   className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.email ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                   placeholder="Digite seu e-mail"
                 />
                 {errors.email && (
                   <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                 )}
               </div>

               {/* CPF */}
               <div>
                 <label htmlFor="cpf" className="block text-sm font-medium text-white mb-2">
                   CPF *
                 </label>
                 <input
                   type="text"
                   id="cpf"
                   name="cpf"
                   value={formData.cpf}
                   onChange={handleInputChange}
                   required
                   className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.cpf ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.cpf ? 'border-red-500' : 'border-gray-600'}`}
                   placeholder="000.000.000-00"
                   maxLength={14}
                 />
                 {errors.cpf && (
                   <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>
                 )}
               </div>

               {/* Endereço */}
               <div>
                 <label htmlFor="endereco" className="block text-sm font-medium text-white mb-2">
                   Endereço *
                 </label>
                 <input
                   type="text"
                   id="endereco"
                   name="endereco"
                   value={formData.endereco}
                   onChange={handleInputChange}
                   required
                   className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.endereco ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.endereco ? 'border-red-500' : 'border-gray-600'}`}
                   placeholder="Digite seu endereço completo"
                 />
                 {errors.endereco && (
                   <p className="mt-1 text-sm text-red-500">{errors.endereco}</p>
                 )}
               </div>

               {/* Bairro e CEP */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="bairro" className="block text-sm font-medium text-white mb-2">
                     Bairro *
                   </label>
                   <input
                     type="text"
                     id="bairro"
                     name="bairro"
                     value={formData.bairro}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.bairro ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.bairro ? 'border-red-500' : 'border-gray-600'}`}
                     placeholder="Digite seu bairro"
                   />
                   {errors.bairro && (
                     <p className="mt-1 text-sm text-red-500">{errors.bairro}</p>
                   )}
                 </div>

                 <div>
                   <label htmlFor="cep" className="block text-sm font-medium text-white mb-2">
                     CEP *
                   </label>
                   <input
                     type="text"
                     id="cep"
                     name="cep"
                     value={formData.cep}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.cep ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.cep ? 'border-red-500' : 'border-gray-600'}`}
                     placeholder="00000-000"
                     maxLength={9}
                   />
                   {errors.cep && (
                     <p className="mt-1 text-sm text-red-500">{errors.cep}</p>
                   )}
                 </div>
               </div>

               {/* Cidade e Estado */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="cidade" className="block text-sm font-medium text-white mb-2">
                     Cidade *
                   </label>
                   <input
                     type="text"
                     id="cidade"
                     name="cidade"
                     value={formData.cidade}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.cidade ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.cidade ? 'border-red-500' : 'border-gray-600'}`}
                     placeholder="Digite sua cidade"
                   />
                   {errors.cidade && (
                     <p className="mt-1 text-sm text-red-500">{errors.cidade}</p>
                   )}
                 </div>

                 <div>
                   <label htmlFor="estado" className="block text-sm font-medium text-white mb-2">
                     Estado *
                   </label>
                   <select
                     id="estado"
                     name="estado"
                     value={formData.estado}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.estado ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.estado ? 'border-red-500' : 'border-gray-600'}`}
                   >
                     <option value="" className="bg-[#282828] text-white">Selecione o estado</option>
                     {estados.map(estado => (
                       <option key={estado} value={estado} className="bg-white text-black">{estado}</option>
                     ))}
                   </select>
                   {errors.estado && (
                     <p className="mt-1 text-sm text-red-500">{errors.estado}</p>
                   )}
                 </div>
               </div>

               {/* Celular e Turma */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="celular" className="block text-sm font-medium text-white mb-2">
                     Celular *
                   </label>
                   <input
                     type="tel"
                     id="celular"
                     name="celular"
                     value={formData.celular}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.celular ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.celular ? 'border-red-500' : 'border-gray-600'}`}
                     placeholder="(00) 00000-0000"
                     maxLength={15}
                   />
                   {errors.celular && (
                     <p className="mt-1 text-sm text-red-500">{errors.celular}</p>
                   )}
                 </div>

                 <div>
                   <label htmlFor="turma" className="block text-sm font-medium text-white mb-2">
                     Turma *
                   </label>
                   <select
                     id="turma"
                     name="turma"
                     value={formData.turma}
                     onChange={handleInputChange}
                     required
                     className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.turma ? 'bg-[#e8f0fe] text-black' : 'bg-[#282828] text-white'} ${errors.turma ? 'border-red-500' : 'border-gray-600'}`}
                   >
                     <option value="" className="bg-[#282828] text-white">Selecione sua turma</option>
                     <option value="Turma 1" className="bg-white text-black">Turma 1</option>
                     <option value="Turma 2" className="bg-white text-black">Turma 2</option>
                     <option value="Turma 3" className="bg-white text-black">Turma 3</option>
                     <option value="Turma 4" className="bg-white text-black">Turma 4</option>
                     <option value="Turma 5" className="bg-white text-black">Turma 5</option>
                     <option value="Turma 6" className="bg-white text-black">Turma 6</option>
                   </select>
                   {errors.turma && (
                     <p className="mt-1 text-sm text-red-500">{errors.turma}</p>
                   )}
                 </div>
               </div>

               {/* Autorização para e-mails */}
               <div className="bg-[#282828] p-4 rounded-md">
                 <div className="flex items-start">
                   <input
                     type="checkbox"
                     id="autorizaEmails"
                     name="autorizaEmails"
                     checked={formData.autorizaEmails}
                     onChange={handleInputChange}
                     className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                   />
                   <label htmlFor="autorizaEmails" className="ml-3 text-sm text-white">
                     <span className="font-medium">Autorizo receber e-mails com novidades</span> e participar de listas de transmissão 
                     com informações sobre promoções, sorteios e novidades da empresa. 
                     <span className="text-xs text-gray-400 block mt-1">
                       Você pode cancelar a inscrição a qualquer momento.
                     </span>
                   </label>
                 </div>
               </div>

               {/* Botão de envio */}
               <div className="pt-4">
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className={`w-full py-3 px-6 rounded-md font-medium focus:ring-2 focus:ring-[#b31111] focus:ring-offset-2 transition-colors duration-200 ${
                     isSubmitting 
                       ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                       : 'bg-[#b31111] text-white hover:bg-[#9a0e0e]'
                   }`}
                 >
                   {isSubmitting ? 'Enviando...' : 'Participar do Sorteio'}
                 </button>
               </div>
             </form>
          </div>
        </div>
      </div>
    </>
  );
}
