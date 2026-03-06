export interface User {
  id: number;
  username: string;
  role: 'student' | 'teacher' | 'parent';
  name: string;
  student_id?: number;
}

export interface Student {
  id: number;
  name: string;
  nis: string;
  class: string;
  photo_url: string;
  parent_id?: number;
}

export interface Attendance {
  id: number;
  student_id: number;
  date: string;
  time: string;
  status: 'present' | 'late' | 'absent';
  method: 'selfie' | 'manual';
  photo_proof?: string;
  student_name?: string;
  student_class?: string;
}
