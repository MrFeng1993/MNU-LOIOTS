package com.mnu.loiots.repository.impl;

import com.mnu.loiots.repository.ICustomRepository;
import com.mnu.loiots.utils.CopyBeanUtils;
import com.mnu.loiots.utils.PageModel;
import org.hibernate.query.internal.NativeQueryImpl;
import org.hibernate.transform.Transformers;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CustomRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
    implements ICustomRepository<T, ID> {

    private final EntityManager entityManager;

    public CustomRepositoryImpl(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public T update(ID id, T t) {
        T source = super.findById(id).get();
        CopyBeanUtils.copyProperties(t, source);
        return super.save(source);
    }

    @Override
    public T findOne(ID id) {
        return findById(id).orElse(null);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> nativeQuery(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public List<?> nativeQuery(String sql) {
        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList();
    }

    @Override
    public List<?> nativeQuery(String sql, Class<?> resultClass, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        setParams(query, params);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> nativeQuery(String sql, Object... params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> nativeQuery(String sql, Class<?> resultClass, Object... params) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql, Class<?> resultClass, Object... params) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql,Class<?> resultClass ,int pageNo, int pageSize){
        Query query = entityManager.createNativeQuery(sql, resultClass);
        query.setFirstResult((pageNo - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql, Class<?> resultClass, int pageNo, int pageSize, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        query.setFirstResult((pageNo - 1) * pageSize);
        query.setMaxResults(pageSize);
        setParams(query, params);
        return query.getResultList();
    }

    /**
     * ??????query??????
     *
     * @param query
     * @param params
     */
    private void setParams(Query query, Object... params) {
        if (params != null && params.length != 0) {
            for (int i = 0; i < params.length; i++) {
                query.setParameter((i + 1), params[i]);
            }
        }
    }

    /**
     * ??????query??????
     *
     * @param query
     * @param params
     */
    private void setParams(Query query, Map<String, Object> params) {
        if (params != null) {
            Set<String> keySet = params.keySet();
            for (String string : keySet) {
                Object obj = params.get(string);
                query.setParameter(string, obj);
            }
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> nativeQuery(String sql, Map<String, Object> params, int pageNo, int pageSize) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        query.setFirstResult((pageNo - 1) * pageSize).setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    public List<?> nativeQuery(String sql, Class<?> resultClass, Map<String, Object> params, int pageNo, int pageSize) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        setParams(query, params);
        query.setFirstResult((pageNo - 1) * pageSize).setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    @Transactional
    public int updateBySQL(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        return query.executeUpdate();
    }

    @Override
    public PageModel findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        PageModel pageModel = new PageModel();
        Page<T> page = findAll(pageable);
        pageModel.setCount(page.getTotalElements());
        pageModel.setCurrentNo(pageNo);
        pageModel.setObject(page.getContent());
        pageModel.setTotalPages(page.getTotalPages());
        return pageModel;
    }

    @Override
    public List<T> findByExample(T t) {
        Example<T> example = Example.of(t);
        return findAll(example);
    }

    @Override
    public PageModel findAll(Specification<T> spec, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        PageModel pageModel = new PageModel();
        Page<T> page = findAll(spec, pageable);
        pageModel.setCount(page.getTotalElements());
        pageModel.setCurrentNo(pageNo);
        pageModel.setObject(page.getContent());
        pageModel.setTotalPages(page.getTotalPages());
        return pageModel;
    }

    @Override
    public PageModel findAll(Specification<T> spec, int pageNo, int pageSize, Sort sort) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        PageModel pageModel = new PageModel();
        Page<T> page = findAll(spec, pageable);
        pageModel.setCount(page.getTotalElements());
        pageModel.setCurrentNo(pageNo);
        pageModel.setObject(page.getContent());
        pageModel.setTotalPages(page.getTotalPages());
        return pageModel;
    }

    @Override
    public List<?> findByJPQL(String jpql) {
        Query query = entityManager.createQuery(jpql);
        return query.getResultList();
    }

    @Override
    public List<?> findByJPQL(String jpql, Class<?> resultClass) {
        Query query = entityManager.createQuery(jpql, resultClass);
        return query.getResultList();
    }

    @Override
    public List<?> findByJPQL(String jpql, int pageNo, int pageSize) {
        Query query = entityManager.createQuery(jpql);
        query.setFirstResult((pageNo - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    public Long countByJPQL(String jpql) {
        Query query = entityManager.createQuery(jpql);
        return (Long) query.getSingleResult();
    }

    @Override
    public List<?> findBySQL(String sql, Object... params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql, int pageNo, int pageSize) {
        Query query = entityManager.createNativeQuery(sql);
        query.setFirstResult((pageNo - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    public Long countBySQL(String sql) {
        Query query = entityManager.createNativeQuery(sql);
        Object obj = query.getSingleResult();// ?????????java.math.BigInteger
        return obj != null ? Long.valueOf(obj.toString()) : 0;
    }

    @Override
    public Long countBySql(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        Object count = query.getSingleResult();
        if (count instanceof BigInteger) {
            return ((BigInteger) count).longValue();
        }
        return (Long) query.getSingleResult();
    }

    @Override
    public List<?> findBySQL(String sql, PageModel pageModel, Object... params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        query.setFirstResult((pageModel.getCurrentNo() - 1) * pageModel.getPageSize());
        query.setMaxResults(pageModel.getPageSize());
        return query.getResultList();
    }

    @Override
    public List<?> findBySQL(String sql, PageModel pageModel, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        query.setFirstResult((pageModel.getCurrentNo() - 1) * pageModel.getPageSize());
        query.setMaxResults(pageModel.getPageSize());
        return query.getResultList();
    }

    @Override
    public int updateByJPQL(String jpql, Map<String, Object> params) {
        Query query = entityManager.createQuery(jpql);
        setParams(query, params);
        return query.executeUpdate();
    }

    @Override
    public PageModel findAll(Specification<T> spec, PageModel pageModel, Sort sort) {
        Pageable pageable = PageRequest.of(pageModel.getCurrentNo() - 1, pageModel.getPageSize(), sort);
        Page<T> page = findAll(spec, pageable);
        pageModel.setCount(page.getTotalElements());
        pageModel.setObject(page.getContent());
        pageModel.setTotalPages(page.getTotalPages());
        return pageModel;
    }

    @Override
    public List<?> findByJPQL(String jpql, PageModel pageModel, Map<String, Object> params, Class<?> resultClass) {
        Query query = entityManager.createQuery(jpql, resultClass);
        setParams(query, params);
        query.setFirstResult((pageModel.getCurrentNo() - 1) * pageModel.getPageSize());
        query.setMaxResults(pageModel.getPageSize());
        return query.getResultList();
    }

    @Override
    public List<?> findByJPQL(String jpql, Map<String, Object> params, Class<?> resultClass) {
        Query query = entityManager.createQuery(jpql, resultClass);
        setParams(query, params);
        return query.getResultList();
    }

    @Override
    public Long countByJPQL(String jpql, Map<String, Object> params) {
        Query query = entityManager.createQuery(jpql);
        setParams(query, params);
        return (Long) query.getSingleResult();
    }

    @Override
    public String aggregateQuery(String sql) {
        Query query = entityManager.createNativeQuery(sql);
        return String.valueOf(query.getSingleResult());
    }


    @Override
    public List<Map> findMapResultBySQL(String sql, PageModel pageModel, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        setParams(query, params);
        query.setFirstResult((pageModel.getCurrentNo() - 1) * pageModel.getPageSize());
        query.setMaxResults(pageModel.getPageSize());
        query.unwrap(NativeQueryImpl.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        return query.getResultList();
    }

}