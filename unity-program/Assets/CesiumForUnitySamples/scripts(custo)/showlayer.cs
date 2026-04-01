using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class showlayer : MonoBehaviour
{

    public GameObject _object;
    private bool enabled = true;

    public void onClick() {
        enabled = !enabled;
        _object.SetActive(enabled);
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
