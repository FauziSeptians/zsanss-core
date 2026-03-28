import axios, { type AxiosInstance } from 'axios';

/**
 * Kerangka *Interface* paling mendasar untuk menyelaraskan entitas data dengan ID unik.
 *
 * Menjamin bahwa kontrak model setiap entitas pasti memiliki *property* pemicu dasar 
 * pengenal (`id`) secara konsisten.
 */
export interface BaseEntity {
  /** 
   * Identifikasi unik kunci entitas pelacak (Entity primary key). 
   * Biasa berbentuk kombinasi string padat (UUID) maupun hitungan angka logis otomatis numerikal berantai (Auto-increment). 
   */
  id?: string | number;
}

/**
 * Representasi Core Service Class bersifat abstrak sebagai *base controller* statis 
 * pengelola interaksi protokol lalu lintas permintaan layanan CRUD (Create, Read, Update, Delete) 
 * secara dinamikal.
 *
 * Berbekal perantara tangguh instansiasi `Axios` mandiri, siap memikul kendali untuk pertukaran HTTPS reguler, 
 * *interceptors* injeksi identitas secara otomatis, dan respons adaptif komperhensif.
 * 
 * @template T - Skema tipe data struktural utama entitas representasi respons utuh.
 * @template C - Format kerangka Data Transfer Object (*DTO*) penyusun entitas modifikasi payload murni untuk mode `Create`. Default: sejalan terhadap `T`.
 * @template U - Format penyederhanaan fleksibel kerangka muatan penyesuaian/modifikasi (Update) opsional. Default: bersifat *Partial* dari tipe `C`.
 */
export abstract class BaseApiService<T extends BaseEntity, C = T, U = Partial<C>> {
  /** Instance axios yang telah dikonfigurasi. */
  protected http: AxiosInstance;
  /** Nama resource endpoint (misal: 'users', 'products'). */
  protected resource: string;

  /**
   * Mengkonstruksi arsitektur penanganan *service* baru menyesuaikan format *endpoint* dinamis.
   *
   * @param resource - Struktur nama pemetaan letak titik akhir (endpoint resource route).
   * @param baseURL - Pondasi *hostname* utama awalan *prefix* konektor muara referensi pengarah API. Default merujuk secara lokal ke `'/api'`.
   * 
   * @example
   * ```tsx
   * // Contoh penerapan 1: Relasi endpoint jalur reguler rute Internal app ('/api/users')
   * class UserService extends BaseApiService<User> {
   *   constructor() {
   *     // Secara bawaan menginduksi baseURL menjadi '/api'
   *     super('users'); 
   *   }
   * }
   * 
   * // Contoh penerapan 2: Delegasi komunikasi memfokusi modul independen / Microservice 
   * class SessionService extends BaseApiService<Session> {
   *   constructor() {
   *     // Titik akses Endpoint mutlak menjadi utuh ke: https://auth.api.com/v1/user-sessionmanagement
   *     super('user-sessionmanagement', 'https://auth.api.com/v1');
   *   }
   * }
   * ```
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