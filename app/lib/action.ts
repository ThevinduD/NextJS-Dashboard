'use server'
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const FormSchema2 = z.object({
  name: z.string({
    required_error: 'Please enter a name.',
  }).min(1, 'Please enter a name.'),

  email: z.string({
    required_error: 'Please enter an valid email.',
  }).email('Please enter an valid email.'),
});



export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};

export type State2 = {
    errors?: {
      name?: string[];
      email?: string[];
    };
    message?: string | null;
};

const CreateInvoice = FormSchema.omit({id:true, date:true})

export async function createInvoice(prevState:State, formdata:FormData){
    const validatedFields = CreateInvoice.safeParse ({
        customerId: formdata.get('customerId'),
        amount: formdata.get('amount'),
        status: formdata.get('status')
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try{
        await sql `INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    }catch(error) {
        console.log(error);
        return {message: 'Database Error: Failed to Create Invoice.'}
    }

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices');
}


const UpdateInvoice = FormSchema.omit({id:true, date:true})

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
    const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        console.log(error);
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql `DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}



//Customer actions
const CreateCustomer = FormSchema2
const randomId = Math.floor(Math.random()*100) + 1

export async function createCustomer(prevState:State2, formdata:FormData){
  const validatedFields = CreateCustomer.safeParse ({
      name: formdata.get('name'),
      email: formdata.get('email')
  })

  if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Customer.',
      };
  }

  const { name, email } = validatedFields.data;
  const imgUrl = `https://robohash.org/${randomId}.png`

  try{
    const existingEmail = await sql`
      SELECT email FROM customers WHERE email = ${email}
    `;
    if (existingEmail.length > 0) {
      return {
        message: 'Email already exists. Please use a different email.'
      };
    }

      await sql `INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imgUrl})`;
  }catch(error) {
      console.log(error);
      return {message: 'Database Error: Failed to Create Invoice.'}
  }

  revalidatePath('/dashboard/customers')
  redirect('/dashboard/customers');
}



const UpdateCustomer = FormSchema2

export async function updateCustomer(id: string, prevState:State2, formdata:FormData){
  const validatedFields = UpdateCustomer.safeParse ({
      name: formdata.get('name'),
      email: formdata.get('email')
  })

  if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Edit Customer.',
      };
  }

  const { name, email } = validatedFields.data;

  try{
      await sql `
        UPDATE customers
        SET name = ${name}, email = ${email}
        WHERE id = ${id}
      `;
  }catch(error) {
      console.log(error);
      return {message: 'Database Error: Failed to Create Customer.'}
  }

  revalidatePath('/dashboard/customers')
  redirect('/dashboard/customers');
}








//Authenticate
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        return error.message || 'Authentication failed.';
      }
      throw error;
    }
}



