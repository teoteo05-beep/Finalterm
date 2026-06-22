/**
 * @author Thành viên 2 (Database & API)
 * @description File cấu hình kết nối Supabase
 */
/* ============================================================
   SUPABASE DATA CONFIGURATION INITIALIZATION
    ============================================================ */
    const SUPABASE_URL = "https://xemhjbfuxsqbslfshswg.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_hh6fD9DywNlsKtUweNHY3Q_XLnKlfHN";
    const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);