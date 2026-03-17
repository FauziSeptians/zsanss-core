import axios, { type AxiosInstance } from 'axios';

/**
 * Interface dasar untuk ID entitas.
 * Menjamin bahwa setiap entitas memiliki field ID yang konsisten.
 */
export interface BaseEntity {
  /** ID unik entitas, bisa berupa string (UUID) atau number (Auto-increment). */
  id?: string | number;
}

/**
 * Core Service Class abstrak untuk menangani operasi CRUD secara dinamis.
 * Menggunakan Axios untuk komunikasi HTTP dan mendukung interceptor token otomatis.
 * * @template T - Tipe data utama entitas (misal: User, Product).
 * @template C - Tipe data untuk operasi Create/Payload (DTO). Default: T.
 * @template U - Tipe data untuk operasi Update. Default: Partial dari C.
 */
export abstract class BaseApiService<T extends BaseEntity, C = T, U = Partial<C>> {
  /** Instance axios yang telah dikonfigurasi. */
  protected http: AxiosInstance;
  /** Nama resource endpoint (misal: 'users', 'products'). */
  protected resource: string;

  /**
   * @param resource - Nama resource API.
   * @param baseURL - URL dasar API. Default: '/api'.
   * * @example
   * // Contoh 1: Menggunakan BaseURL default ('/api')
   * class UserService extends BaseApiService<User> {
   * constructor() {
   * super('users'); 
   * }
   * }
   * * @example
   * // Contoh 2: Menggunakan BaseURL kustom (Microservice atau External API)
   * class SessionService extends BaseApiService<Session> {
   * constructor() {
   * // Endpoint akan menjadi: https://auth.api.com/v1/user-sessionmanagement
   * super('user-sessionmanagement', 'https://auth.api.com/v1');
   * }
   * }
   */
  constructor(resource: string, baseURL: string = '/api') {
    this.resource = resource;
    this.http = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Mengambil semua item dari resource.
   * @param params - Query parameters opsional untuk filtering, sorting, atau pagination.
   * @returns Promise berisi array dari entitas T.
   */
  async getAll(params?: object): Promise<T[]> {
    const res = await this.http.get<T[]>(`/${this.resource}`, { params });
    return res.data;
  }

  /**
   * Mengambil satu item berdasarkan ID.
   * @param id - ID dari entitas yang dicari.
   * @returns Promise berisi entitas T.
   */
  async getById(id: string | number): Promise<T> {
    const res = await this.http.get<T>(`/${this.resource}/${id}`);
    return res.data;
  }

  /**
   * Membuat entitas baru di server.
   * @param payload - Data entitas baru (DTO Create).
   * @returns Promise berisi entitas T yang berhasil dibuat.
   */
  async create(payload: C): Promise<T> {
    const res = await this.http.post<T>(`/${this.resource}`, payload);
    return res.data;
  }

  /**
   * Memperbarui entitas yang sudah ada.
   * @param id - ID entitas yang ingin diubah.
   * @param payload - Data perubahan (Partial DTO).
   * @returns Promise berisi entitas T yang telah diperbarui.
   */
  async update(id: string | number, payload: U): Promise<T> {
    const res = await this.http.put<T>(`/${this.resource}/${id}`, payload);
    return res.data;
  }

  /**
   * Menghapus entitas dari server.
   * @param id - ID entitas yang ingin dihapus.
   * @returns Promise void.
   */
  async delete(id: string | number): Promise<void> {
    await this.http.delete(`/${this.resource}/${id}`);
  }
}