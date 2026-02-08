const { supabase } = require('../config/supabase');

const list = async (table) => {
  const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true });
  if (error) throw error;
  return data;
};

const getById = async (table, id) => {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
};

const create = async (table, payload) => {
  const { data, error } = await supabase.from(table).insert(payload).select('*').single();
  if (error) throw error;
  return data;
};

const update = async (table, id, payload) => {
  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select('*').maybeSingle();
  if (error) throw error;
  return data;
};

const remove = async (table, id) => {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
