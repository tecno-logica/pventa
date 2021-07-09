import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CodTransacCodigoLocationInput = {
  transacCode: Scalars['Float'];
  inventoryId: Scalars['Float'];
  location: Scalars['String'];
};

export type CodeAmountInput = {
  inventoryId: Scalars['Float'];
  amount?: Maybe<Scalars['Float']>;
};

export type CodigoInput = {
  inventoryId: Scalars['Float'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  rnc: Scalars['String'];
  name: Scalars['String'];
};

export type CompanyLoginInput = {
  name: Scalars['String'];
};

export type CompanyRegistrationInput = {
  host: Scalars['String'];
  database: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  errors?: Maybe<Array<FieldError>>;
  company?: Maybe<Company>;
  config?: Maybe<Config>;
};

export type Config = {
  __typename?: 'Config';
  NomEmpresa: Scalars['String'];
  Direccion?: Maybe<Scalars['String']>;
  Itbis: Scalars['Float'];
  Itbis1: Scalars['Float'];
  RNC: Scalars['String'];
  Correo_Electronico?: Maybe<Scalars['String']>;
  TipoEmpresa: Scalars['Float'];
  Logo?: Maybe<Scalars['String']>;
  FirmaDigital: Scalars['String'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type IdCodeAmountLotsInput = {
  inventoryId: Scalars['Float'];
  amount?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  lots?: Maybe<Array<LotsInput>>;
};

export type IdInput = {
  id: Scalars['Float'];
};

export type Inventario = {
  __typename?: 'Inventario';
  Codigo: Scalars['Float'];
  Descripcion?: Maybe<Scalars['String']>;
  Referencia?: Maybe<Scalars['String']>;
  Info: Scalars['String'];
  UndCompra?: Maybe<Scalars['Float']>;
  UndVenta?: Maybe<Scalars['Float']>;
  Itbis: Scalars['Float'];
  CostoUS: Scalars['Float'];
  CostoPromedio: Scalars['Float'];
  Precio0: Scalars['Float'];
  Precio1: Scalars['Float'];
  Precio2: Scalars['Float'];
  PrecioVenta?: Maybe<Scalars['Float']>;
  Existencia: Scalars['Float'];
  NivelMin?: Maybe<Scalars['Float']>;
  NivelMax?: Maybe<Scalars['Float']>;
  CodigoBarra?: Maybe<Scalars['String']>;
  Deducible: Scalars['Float'];
  FechaVence?: Maybe<Scalars['DateTime']>;
  Grupo: Scalars['Float'];
  Cliente: Scalars['Float'];
  Puntos: Scalars['Float'];
  Ordenado: Scalars['Float'];
  CtaIngreso?: Maybe<Scalars['String']>;
  CtaDescuento?: Maybe<Scalars['String']>;
  CtaImpuesto?: Maybe<Scalars['String']>;
  CtaDevolucion?: Maybe<Scalars['String']>;
  CtaInventario?: Maybe<Scalars['String']>;
  CtaCosto?: Maybe<Scalars['String']>;
  CtaDescuentoCompra?: Maybe<Scalars['String']>;
  CentroCosto?: Maybe<Scalars['String']>;
};

export type InventarioFisico = {
  __typename?: 'InventarioFisico';
  CodTransac: Scalars['Float'];
  Codigo: Scalars['Float'];
  Existencia: Scalars['Float'];
  ExistenciaSistema: Scalars['Float'];
  CostoPromedio: Scalars['Float'];
  FechaConteo?: Maybe<Scalars['DateTime']>;
  Usuario: Scalars['String'];
  FechaProceso?: Maybe<Scalars['DateTime']>;
};

export type InventarioFisicoLote = {
  __typename?: 'InventarioFisicoLote';
  Id: Scalars['Float'];
  CodTransac: Scalars['Float'];
  Codigo: Scalars['Float'];
  Ubicacion?: Maybe<Scalars['String']>;
  Cantidad: Scalars['Float'];
  Lote: Scalars['String'];
  FechaFabricacion?: Maybe<Scalars['DateTime']>;
  FechaVence: Scalars['DateTime'];
  RegistroSanitario?: Maybe<Scalars['String']>;
};

export type LotsInput = {
  Id: Scalars['Float'];
  CodTransac: Scalars['Float'];
  Codigo: Scalars['Float'];
  Ubicacion?: Maybe<Scalars['String']>;
  Cantidad: Scalars['Float'];
  Lote: Scalars['String'];
  FechaFabricacion?: Maybe<Scalars['DateTime']>;
  FechaVence: Scalars['DateTime'];
  RegistroSanitario?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponseWithPassword;
  login: UserResponse;
  logout: Scalars['Boolean'];
  loginCompany: CompanyResponse;
  registerCompany: CompanyResponse;
  createPhysicalInventoryLot: PhysicalInventoryLotResponse;
  destroyPhysicalInventoryLot: PhysicalInventoryLotResponse;
  storePhysicalInventory: PhysicalInventoryResponse;
  updatePhysicalInventory: PhysicalInventoryResponse;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordRoleInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginCompanyArgs = {
  options: CompanyLoginInput;
};


export type MutationRegisterCompanyArgs = {
  options: CompanyRegistrationInput;
};


export type MutationCreatePhysicalInventoryLotArgs = {
  input: CodTransacCodigoLocationInput;
};


export type MutationDestroyPhysicalInventoryLotArgs = {
  input: IdInput;
};


export type MutationStorePhysicalInventoryArgs = {
  input: CodeAmountInput;
};


export type MutationUpdatePhysicalInventoryArgs = {
  input: IdCodeAmountLotsInput;
};

export type PhysicalInventoryLotResponse = {
  __typename?: 'PhysicalInventoryLotResponse';
  errors?: Maybe<Array<FieldError>>;
  physicalInventoryLot?: Maybe<InventarioFisicoLote>;
  physicalInventory?: Maybe<InventarioFisico>;
  inventory?: Maybe<Inventario>;
};

export type PhysicalInventoryResponse = {
  __typename?: 'PhysicalInventoryResponse';
  errors?: Maybe<Array<FieldError>>;
  physicalInventory?: Maybe<InventarioFisico>;
  inventory?: Maybe<Inventario>;
  distribution?: Maybe<Array<InventarioFisicoLote>>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  currentCompany: CompanyResponse;
  getFirstPhysicalInventoryEntry: PhysicalInventoryResponse;
  getPhysicalInventoryByInventory: PhysicalInventoryResponse;
  allPhysicalInventories: Array<InventarioFisico>;
};


export type QueryGetPhysicalInventoryByInventoryArgs = {
  input: CodigoInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  cedula: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  role: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserResponseWithPassword = {
  __typename?: 'UserResponseWithPassword';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  password?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  cedula: Scalars['String'];
  password: Scalars['String'];
};

export type UsernamePasswordRoleInput = {
  cedula: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Int'];
};

export type FullUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'cedula' | 'username' | 'firstName' | 'lastName' | 'email' | 'isActive' | 'role' | 'createdAt' | 'updatedAt'>
);

export type LoginCompanyMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type LoginCompanyMutation = (
  { __typename?: 'Mutation' }
  & { loginCompany: (
    { __typename?: 'CompanyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'rnc' | 'name'>
    )>, config?: Maybe<(
      { __typename?: 'Config' }
      & Pick<Config, 'NomEmpresa' | 'Direccion' | 'Itbis' | 'Itbis1' | 'RNC' | 'Correo_Electronico' | 'TipoEmpresa'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  cedula: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterCompanyMutationVariables = Exact<{
  host: Scalars['String'];
  database: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterCompanyMutation = (
  { __typename?: 'Mutation' }
  & { registerCompany: (
    { __typename?: 'CompanyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<Company, 'rnc'>
    )>, config?: Maybe<(
      { __typename?: 'Config' }
      & Pick<Config, 'NomEmpresa' | 'Direccion' | 'Itbis' | 'Itbis1' | 'RNC' | 'Correo_Electronico' | 'TipoEmpresa'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  cedula: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Int'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponseWithPassword' }
    & Pick<UserResponseWithPassword, 'password'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserFragment
    )> }
  ) }
);

export type GetFirstEntryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFirstEntryQuery = (
  { __typename?: 'Query' }
  & { getFirstPhysicalInventoryEntry: (
    { __typename?: 'PhysicalInventoryResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, physicalInventory?: Maybe<(
      { __typename?: 'InventarioFisico' }
      & Pick<InventarioFisico, 'CodTransac' | 'Codigo' | 'Existencia' | 'Usuario' | 'FechaConteo' | 'ExistenciaSistema' | 'FechaProceso'>
    )>, inventory?: Maybe<(
      { __typename?: 'Inventario' }
      & Pick<Inventario, 'Codigo' | 'Descripcion' | 'Itbis' | 'CostoUS' | 'CostoPromedio' | 'Precio0' | 'Precio1' | 'Precio2' | 'PrecioVenta' | 'Existencia' | 'CodigoBarra'>
    )>, distribution?: Maybe<Array<(
      { __typename?: 'InventarioFisicoLote' }
      & Pick<InventarioFisicoLote, 'Id' | 'CodTransac' | 'Codigo' | 'Ubicacion' | 'Cantidad' | 'Lote' | 'FechaFabricacion' | 'FechaVence' | 'RegistroSanitario'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & FullUserFragment
  )> }
);

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  cedula
  username
  firstName
  lastName
  email
  isActive
  role
  createdAt
  updatedAt
}
    `;
export const LoginCompanyDocument = gql`
    mutation loginCompany($name: String!) {
  loginCompany(options: {name: $name}) {
    errors {
      field
      message
    }
    company {
      id
      rnc
      name
    }
    config {
      NomEmpresa
      Direccion
      Itbis
      Itbis1
      RNC
      Correo_Electronico
      TipoEmpresa
    }
  }
}
    `;

export function useLoginCompanyMutation() {
  return Urql.useMutation<LoginCompanyMutation, LoginCompanyMutationVariables>(LoginCompanyDocument);
};
export const LoginDocument = gql`
    mutation login($cedula: String!, $password: String!) {
  login(options: {cedula: $cedula, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...FullUser
    }
  }
}
    ${FullUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterCompanyDocument = gql`
    mutation RegisterCompany($host: String!, $database: String!, $username: String!, $password: String!) {
  registerCompany(
    options: {host: $host, database: $database, username: $username, password: $password}
  ) {
    errors {
      field
      message
    }
    company {
      rnc
    }
    config {
      NomEmpresa
      Direccion
      Itbis
      Itbis1
      RNC
      Correo_Electronico
      TipoEmpresa
    }
  }
}
    `;

export function useRegisterCompanyMutation() {
  return Urql.useMutation<RegisterCompanyMutation, RegisterCompanyMutationVariables>(RegisterCompanyDocument);
};
export const RegisterDocument = gql`
    mutation register($cedula: String!, $password: String!, $role: Int!) {
  register(options: {cedula: $cedula, password: $password, role: $role}) {
    errors {
      field
      message
    }
    user {
      ...FullUser
    }
    password
  }
}
    ${FullUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetFirstEntryDocument = gql`
    query getFirstEntry {
  getFirstPhysicalInventoryEntry {
    errors {
      field
      message
    }
    physicalInventory {
      CodTransac
      Codigo
      Existencia
      Usuario
      FechaConteo
      ExistenciaSistema
      FechaProceso
    }
    inventory {
      Codigo
      Descripcion
      Itbis
      CostoUS
      CostoPromedio
      Precio0
      Precio1
      Precio2
      PrecioVenta
      Existencia
      CodigoBarra
    }
    distribution {
      Id
      CodTransac
      Codigo
      Ubicacion
      Cantidad
      Lote
      FechaFabricacion
      FechaVence
      RegistroSanitario
    }
  }
}
    `;

export function useGetFirstEntryQuery(options: Omit<Urql.UseQueryArgs<GetFirstEntryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFirstEntryQuery>({ query: GetFirstEntryDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};